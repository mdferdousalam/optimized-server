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
          const { email, amount, transactionDate } = row;
          let donor = await prisma.user.findUnique({ where: { email } });

          if (donor) {
            await prisma.donation.create({
              data: {
                donorId: donor.id,
                amount: parseFloat(amount),
                transactionDate: new Date(transactionDate),
              },
            });
          } else {
            await prisma.user.create({
              data: {
                email,
                donations: {
                  create: {
                    amount: parseFloat(amount),
                    transactionDate: new Date(transactionDate),
                  },
                },
              },
            });
          }
        }
        resolve();
      })
      .on("error", reject);
  });
};
