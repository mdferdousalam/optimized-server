const csvService = require("../services/csvService");

exports.uploadCSV = async (req, res) => {
  try {
    const { source } = req.body; // Get source from request body
    await csvService.processCSV(req.file.path, source); 
    res.json({ message: "CSV processed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
