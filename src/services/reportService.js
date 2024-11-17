const prisma = require("../prisma/prismaClient");

// exports.getDonors = async (page, limit) => {
//   const skip = (page - 1) * limit;
//   const donors = await prisma.donor.findMany({
//     skip: skip,
//     take: limit,
//   });

//   // Count total donors for pagination metadata
//   const totalDonors = await prisma.donor.count();

//   return {
//     donors,
//     totalDonors,
//     totalPages: Math.ceil(totalDonors / limit),
//     currentPage: page,
//   };
// };

exports.getDonors = async (page, limit) => {
  const skip = (page - 1) * limit;

  // Fetch donors with the total donation amount for each donor
  const donors = await prisma.donor.findMany({
    skip: skip,
    take: limit,
    include: {
      donations: {
        select: {
          amount: true,
        },
      },
    },
  });

  // Calculate total donations for each donor
  const donorsWithTotalDonation = await Promise.all(
    donors.map(async (donor) => {
      const totalDonationAmount = await prisma.donation.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          donorId: donor.id,
        },
      });

      return {
        ...donor,
        totalDonationAmount: totalDonationAmount._sum.amount || 0, // If no donations, default to 0
      };
    })
  );

  // Count total donors for pagination metadata
  const totalDonors = await prisma.donor.count();

  return {
    donors: donorsWithTotalDonation,
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


exports.getDateRangeReportOfDonations = async (transactionDate) => {
  return await prisma.donation.findMany({
    where: {
      transactionDate: transactionDate,
    },
  });
};

exports.searchDonationsReport = async (
  filters,
  sortOptions,
  page,
  pageSize
) => {
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