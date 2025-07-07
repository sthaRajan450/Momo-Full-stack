const jwt = require("jsonwebtoken");

const generateToken = (userId,role) => {
  return jwt.sign({ id: userId ,role:role}, "123456789", { expiresIn: "1h" });
};
module.exports = generateToken;
