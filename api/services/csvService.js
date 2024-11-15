const csv = require("csv-parser");
const fs = require("fs");
const prisma = require("../prisma/prismaClient");

exports.processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        for (const row of results) {
          const { email, amount, transactionDate, name, phoneNumber } = row;

          if (!email) {
            console.error("Missing email in row:", row);
            continue; // Skip rows with no email
          }

          try {
            // Check if the donor exists in the Donor table
            let donor = await prisma.donor.findUnique({ where: { email } });

            // If the donor does not exist, create a new donor
            if (!donor) {
              donor = await prisma.donor.create({
                data: {
                  email,
                  name,
                  phoneNumber,
                  donations: {
                    create: {
                      amount: parseFloat(amount),
                      transactionDate: new Date(transactionDate),
                    },
                  },
                },
              });
            } else {
              // Check for duplicate donation
              const duplicateDonation = await prisma.donation.findFirst({
                where: {
                  donorId: donor.id,
                  amount: parseFloat(amount),
                  transactionDate: new Date(transactionDate),
                },
              });

              // If no duplicate found, create a new donation
              if (!duplicateDonation) {
                await prisma.donation.create({
                  data: {
                    donorId: donor.id,
                    amount: parseFloat(amount),
                    transactionDate: new Date(transactionDate),
                  },
                });
              } else {
                console.log("Duplicate donation found, skipping:", row);
              }
            }
          } catch (error) {
            console.error("Error processing row:", row, error.message);
            continue; // Skip to the next row on error
          }
        }

        // Delete the uploaded file after processing
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err.message);
            reject(err);
          } else {
            console.log("File successfully deleted:", filePath);
            resolve();
          }
        });
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error.message);
        reject(error);
      });
  });
};
