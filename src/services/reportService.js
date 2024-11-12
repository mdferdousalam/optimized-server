const prisma = require("../prisma/prismaClient");

exports.getDonors = async (page, limit) => {
  const skip = (page - 1) * limit;
  const donors = await prisma.donor.findMany({
    skip: skip,
    take: limit,
  });

  // Count total donors for pagination metadata
  const totalDonors = await prisma.donor.count();

  return {
    donors,
    totalDonors,
    totalPages: Math.ceil(totalDonors / limit),
    currentPage: page,
  };
};

exports.getDonations = async (page, limit) => {
  const skip = (page - 1) * limit;

  // Fetch donations with associated donor information
  const donations = await prisma.donation.findMany({
    skip: skip,
    take: limit,
    include: {
      donor: {
        // Assuming you have a 'donor' relation set up in Prisma schema
        select: {
          name: true,
          email: true,
          phoneNumber: true,
        },
      },
    },
  });

  // Count total donations for pagination metadata
  const totalDonations = await prisma.donation.count();

  return {
    donations: donations.map((donation) => ({
      id: donation.id,
      donorId: donation.donorId,
      amount: donation.amount,
      transactionDate: donation.transactionDate,
      donorName: donation.donor.name,
      donorEmail: donation.donor.email,
      donorPhoneNumber: donation.donor.phoneNumber,
      createdAt: donation.createdAt,
    })),
    totalDonations,
    totalPages: Math.ceil(totalDonations / limit),
    currentPage: page,
  };
};


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