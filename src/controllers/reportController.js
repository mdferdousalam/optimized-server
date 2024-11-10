const reportService = require("../services/reportService");

exports.getDonorReport = async (req, res) => {
  try {
    const report = await reportService.getDonorReport(req.params.donorId);
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDateRangeReport = async (req, res) => {
  try {
    const report = await reportService.getDateRangeReport(req.query);
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchDonations = async (req, res) => {
  try {
    const {
      donorId,
      startDate,
      endDate,
      amountMin,
      amountMax,
      sortBy,
      sortOrder,
      page = 1,
      pageSize = 10,
    } = req.query;

    // Build filter object dynamically
    const filters = {};

    if (donorId) filters.donorId = parseInt(donorId);
    if (startDate || endDate) {
      filters.transactionDate = {};
      if (startDate) filters.transactionDate.gte = new Date(startDate);
      if (endDate) filters.transactionDate.lte = new Date(endDate);
    }
    if (amountMin || amountMax) {
      filters.amount = {};
      if (amountMin) filters.amount.gte = parseFloat(amountMin);
      if (amountMax) filters.amount.lte = parseFloat(amountMax);
    }

    const sortOptions = {};
    if (sortBy) sortOptions[sortBy] = sortOrder === "desc" ? "desc" : "asc";

    const report = await reportService.searchDonations(
      filters,
      sortOptions,
      page,
      pageSize
    );
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};