const prisma = require("../prisma/prismaClient");
const {
  startOfDay,
  startOfWeek,
  startOfMonth,
  subMonths,
  startOfYear,
} = require("date-fns");


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
    donations: donations,
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


exports.getStatistics = async () => {
  const today = startOfDay(new Date());
  const startOfThisWeek = startOfWeek(new Date());
  const startOfThisMonth = startOfMonth(new Date());
  const startOfLastMonth = startOfMonth(subMonths(new Date(), 1));
  const startOfThisYear = startOfYear(new Date());

  // Total donors
  const totalDonors = await prisma.donor.count();

  // Total donations
  const totalDonations = await prisma.donation.aggregate({
    _sum: { amount: true },
  });

  // Total donations today
  const totalDonationsToday = await prisma.donation.aggregate({
    where: { transactionDate: { gte: today } },
    _sum: { amount: true },
  });

  // Total donations this week
  const totalDonationsThisWeek = await prisma.donation.aggregate({
    where: { transactionDate: { gte: startOfThisWeek } },
    _sum: { amount: true },
  });

  // Total donations this month
  const totalDonationsThisMonth = await prisma.donation.aggregate({
    where: { transactionDate: { gte: startOfThisMonth } },
    _sum: { amount: true },
  });

  // Total donations last month
  const totalDonationsLastMonth = await prisma.donation.aggregate({
    where: {
      transactionDate: {
        gte: startOfLastMonth,
        lt: startOfThisMonth,
      },
    },
    _sum: { amount: true },
  });

  // Average donation
  const averageDonation = await prisma.donation.aggregate({
    _avg: { amount: true },
  });

  // Total donations this year
  const totalDonationsThisYear = await prisma.donation.aggregate({
    where: { transactionDate: { gte: startOfThisYear } },
    _sum: { amount: true },
  });

  // Offline donations (PayPal)
  const offlineDonations = await prisma.donation.aggregate({
    where: { sourceType: "paypal" },
    _sum: { amount: true },
  });

  // Bank donations
  const bankDonations = await prisma.donation.aggregate({
    where: { sourceType: "bank" },
    _sum: { amount: true },
  });

  
  // Returning all statistics with defaulting undefined values to 0
  return {
    totalDonors,
    totalDonations: totalDonations._sum.amount || 0,
    totalDonationsToday: totalDonationsToday._sum.amount || 0,
    totalDonationsThisWeek: totalDonationsThisWeek._sum.amount || 0,
    totalDonationsThisMonth: totalDonationsThisMonth._sum.amount || 0,
    totalDonationsLastMonth: totalDonationsLastMonth._sum.amount || 0,
    averageDonation: averageDonation._avg.amount || 0,
    totalDonationsThisYear: totalDonationsThisYear._sum.amount || 0,
    offlineDonations: offlineDonations._sum.amount || 0,
    bankDonations: bankDonations._sum.amount || 0,
  };
};