const prisma = require("../prisma/prismaClient");

exports.getDonorReport = async (donorId) => {
  return await prisma.donation.findMany({
    where: { donorId: parseInt(donorId) },
  });
};

exports.getDateRangeReport = async ({ startDate, endDate }) => {
  return await prisma.donation.findMany({
    where: {
      transactionDate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });
};
