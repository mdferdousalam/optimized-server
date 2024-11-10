const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../prisma/prismaClient");


exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error("Invalid email or password");
  }
  return jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: "1h" });
};

exports.resetPassword = async ({ email, newPassword }) => {
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
};
