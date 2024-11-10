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

exports.searchDonations = async (filters, sortOptions, page, pageSize) => {
  const donations = await prisma.donation.findMany({
    where: filters,
    orderBy: sortOptions,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.donation.count({
    where: filters,
  });

  return {
    donations,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
};