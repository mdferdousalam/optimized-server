const csvService = require("../services/csvService");

exports.uploadCSV = async (req, res) => {
  try {
    await csvService.processCSV(req.file.path);
    res.json({ message: "CSV processed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
