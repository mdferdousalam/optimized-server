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


const detectSeparator = async (filePath) => {
  const fs = require("fs");
  const readline = require("readline");

  return new Promise((resolve, reject) => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    let separatorCounts = { ",": 0, ";": 0, "\t": 0, "|": 0 };
    let detectedSeparator = null;

    lineReader.on("line", (line) => {
      // Count occurrences of each separator in the line
      for (const separator in separatorCounts) {
        separatorCounts[separator] += (
          line.match(new RegExp(`\\${separator}`, "g")) || []
        ).length;
      }
      // Close after analyzing the first line
      lineReader.close();
    });

    lineReader.on("close", () => {
      // Find the separator with the maximum count
      detectedSeparator = Object.keys(separatorCounts).reduce((a, b) =>
        separatorCounts[a] > separatorCounts[b] ? a : b
      );
      resolve(detectedSeparator);
    });

    lineReader.on("error", (err) => {
      reject(err);
    });
  });
};

exports.processCSV = async (filePath, source) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Detect separator
      const detectedSeparator = await detectSeparator(filePath);
      console.log("Detected separator:", detectedSeparator);

      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv({ separator: detectedSeparator })) // Use the detected separator
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
                    info: row["Zweck ID"],
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
                    info: row["Zweck ID"],
                    sourceType: "paypal",
                  };

            try {
              const { payerName, email, iban } = donorData;

              let donor = await prisma.donor.findFirst({
                where: { OR: [{ email }, { iban }] },
              });

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
                      },
                    },
                  },
                });
              } else {
                const duplicateDonation = await prisma.donation.findFirst({
                  where: {
                    donorId: donor.id,
                    amount: parseFloat(donorData.amount),
                    transactionDate: new Date(donorData.transactionDate),
                    bookingText: donorData.bookingText,
                  },
                });

                if (!duplicateDonation) {
                  await prisma.donation.create({
                    data: {
                      donorId: donor.id,
                      ...donorData,
                      amount: parseFloat(donorData.amount),
                    },
                  });
                } else {
                  console.log("Duplicate donation found, skipping:", row);
                }
              }
            } catch (error) {
              console.error("Error processing row:", row, error.message);
              continue;
            }
          }

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
    } catch (err) {
      console.error("Error detecting separator:", err.message);
      reject(err);
    }
  });
};

