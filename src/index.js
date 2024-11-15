const express = require("express");
const cors = require("cors");
const homeRoutes = require("./routes/homeRoutes")
const authRoutes = require("./routes/authRoutes");
const csvRoutes = require("./routes/csvRoutes");
const reportRoutes = require("./routes/reportRoutes");
const { checkDatabaseConnection } = require("./prisma/checkDatabaseConnection");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

// Route definitions
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/csv", csvRoutes);
app.use("/report", reportRoutes);

// Call the database connection check on startup
checkDatabaseConnection().then((isConnected) => {
  if (!isConnected) {
    console.log("Exiting due to failed database connection.");
    process.exit(1); // Exit if the database connection failed
  }
});


// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );

module.exports = app;