const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "123456789", { expiresIn: "1h" });
};
module.exports = generateToken;
