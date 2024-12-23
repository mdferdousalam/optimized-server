const reportService = require("../services/reportService");

exports.getDonors = async (req, res) => {
  try {
    // Default to page 1 and limit 10 if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const report = await reportService.getDonors(page, limit);

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;

    const ID = parseInt(id)

    // Call the service function to delete the donor
    const result = await reportService.deleteDonor(ID);

    if (!result) {
      return res.status(404).json({ error: "Donor not found" });
    }

    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getDonations = async (req, res) => {
  try {
    // Default to page 1 and limit 10 if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const report = await reportService.getDonations(page, limit);

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;

    // Call service function to delete the donation
    const result = await reportService.deleteDonation(id);

    if (!result) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.json({ message: "Donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
      searchTerm,
      startDate,
      endDate,
      amountMin,
      amountMax,
      sortBy,
      sortOrder,
      page = 1,
      pageSize = 10,
    } = req.query;

    // Initialize filter object
    const filters = {};
    // Check searchTerm and apply it to multiple fields
    if (searchTerm) {
      const searchInt = parseInt(searchTerm, 10);

      if (!isNaN(searchInt)) {
        // If searchTerm is numeric, filter strictly by donorId
        filters.donorId = searchInt;
      } else {
        // Otherwise, apply OR logic for other fields
        filters.OR = [
          { iban: { contains: searchTerm, mode: "insensitive" } },
          { payerName: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
          { info: { contains: searchTerm, mode: "insensitive" } },
          { sourceType: { contains: searchTerm, mode: "insensitive" } },
        ];
      }
    }

    // Validate and set transactionDate range
    if (startDate || endDate) {
      filters.transactionDate = {};
      if (startDate) {
        const parsedStartDate = new Date(startDate);
        if (!isNaN(parsedStartDate))
          filters.transactionDate.gte = parsedStartDate;
      }
      if (endDate) {
        const parsedEndDate = new Date(endDate);
        if (!isNaN(parsedEndDate)) filters.transactionDate.lte = parsedEndDate;
      }
    }

    // Validate and set amount range
    if (amountMin || amountMax) {
      filters.amount = {};
      if (amountMin) {
        const minAmount = parseFloat(amountMin);
        if (!isNaN(minAmount)) filters.amount.gte = minAmount;
      }
      if (amountMax) {
        const maxAmount = parseFloat(amountMax);
        if (!isNaN(maxAmount)) filters.amount.lte = maxAmount;
      }
    }
  
    // Set sort options only if sortBy is defined
    const sortOptions = {};
    // Conditionally add sort options

    if (sortBy && sortOrder) {
      sortOptions[sortBy] = sortOrder === "desc" ? "desc" : "asc";
    }
    // Fetch donations from service
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


exports.getDonationsReport = async (req, res) => {
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

    // Build filters dynamically
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

    // Determine if it's a date range report request or a filtered search
    if (Object.keys(filters).length === 1 && filters.transactionDate) {
      // Only startDate and/or endDate are specified, so it's a date range report
      const report = await reportService.getDateRangeReportOfDonations(
        filters.transactionDate
      );
      res.json(report);
    } else {
      // Full search with pagination, filters, and sorting
      const report = await reportService.searchDonationsReport(
        filters,
        sortOptions,
        page,
        pageSize
      );
      res.json(report);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const statistics = await reportService.getStatistics();
    return res.status(200).json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    console.log(error);
  }
}