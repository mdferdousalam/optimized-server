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
              // If donor exists, create a donation for them
              await prisma.donation.create({
                data: {
                  donorId: donor.id,
                  amount: parseFloat(amount),
                  transactionDate: new Date(transactionDate),
                },
              });
            }
          } catch (error) {
            console.error("Error processing row:", row, error.message);
            continue; // Skip to the next row on error
          }
        }
        resolve();
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error.message);
        reject(error);
      });
  });
};
