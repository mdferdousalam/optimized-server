const prisma = require("./prismaClient");

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully.");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  }
}

module.exports = { checkDatabaseConnection };
