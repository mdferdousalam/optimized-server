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
