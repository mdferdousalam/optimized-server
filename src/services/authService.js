const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../prisma/prismaClient");

exports.register = async ({ email, password, name }) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, "SECRET_KEY", {
    expiresIn: "1h",
  });

  return token;
};

exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error("Invalid email or password");
  }
  // return jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: "1h" });
  // Generate token
  const token = jwt.sign({ userId: user.id }, "SECRET_KEY", {
    expiresIn: "1h",
  });

  // Return token along with user data (excluding sensitive fields like password)
  return {
    token,
    
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
  };
};

exports.resetPassword = async ({ email, newPassword }) => {
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
};
