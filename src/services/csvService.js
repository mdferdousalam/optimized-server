const csv = require("csv-parser");
const fs = require("fs");
const prisma = require("../prisma/prismaClient");
const parseDate = (dateStr) => {
     // Convert from 'DD.MM.YYYY' to 'YYYY-MM-DD'
    
  try {
    const [day, month, year] = dateStr.split(".");
    return `${year}-${month}-${day}T00:00:00Z`;
  } catch (error) {
    console.log(error)
  }
};

exports.processCSV = (filePath, source) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: source === "bank" ? ";" : "," }))
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        for (const row of results) {
          const donorData =
            source === "bank"
              ? {
                  transactionDate: parseDate(row.Valutadatum),
                  bookingText: row.Buchungstext,
                  purpose: row.Verwendungszweck,
                  payerName: row["Beguenstigter/Zahlungspflichtiger"],
                  iban: row["Kontonummer/IBAN"],
                  bic: row["BIC (SWIFT-Code)"],
                  amount: row.Betrag,
                  currency: row.Waehrung,
                  info: row.Info,
                  sourceType: "bank",
                }
              : {
                  transactionDate: parseDate(row.Valutadatum),
                  purpose: row["Verwendungszweck/ Product ID"],
                  payerName: row["Beguenstigter/Zahlungspflichtiger/ Name"],
                  email: row["Absender E-Mail-Adresse"],
                  amount: row["Betrag/Amount"],
                  currency: row["Waehrung/Currency"],
                  phoneNumber: row["Telefon"],
                  info: row["Info"],
                  sourceType: "paypal",
                };

          try {
            const { payerName, email, iban } = donorData;

            // Find donor by either email or iban
            let donor = await prisma.donor.findFirst({
              where: { OR: [{ email }, { iban }] },
            });

            // If donor exists, use existing name, else create new donor
            if (!donor) {
              donor = await prisma.donor.create({
                data: {
                  name: payerName,
                  email: email || null,
                  iban: iban || null,
                  phoneNumber: donorData.phoneNumber || null,
                  donations: {
                    create: {
                      ...donorData,
                      amount: parseFloat(donorData.amount),
                      // transactionDate: new Date(donorData.transactionDate),
                      
                    },
                  },
                },
              });
            } else {
              // Check for duplicate donation
              const duplicateDonation = await prisma.donation.findFirst({
                where: {
                  donorId: donor.id,
                  amount: parseFloat(donorData.amount),
                  transactionDate: new Date(donorData.transactionDate),
                  bookingText: donorData.bookingText,
                },
              });

              // Create a new donation if no duplicate is found
              if (!duplicateDonation) {
                await prisma.donation.create({
                  data: {
                    donorId: donor.id,
                    ...donorData,
                    amount: parseFloat(donorData.amount),
                    // transactionDate: new Date(donorData.transactionDate),
                    
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
