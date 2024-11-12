const express = require("express");
const cors = require("cors");
const homeRoutes = require("./routes/homeRoutes")
const authRoutes = require("./routes/authRoutes");
const csvRoutes = require("./routes/csvRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Route definitions
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/csv", csvRoutes);
app.use("/report", reportRoutes);

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
