const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Unauthorized — No token found",
    });
  }
  try {
    const decoded = jwt.verify(token, "123456789");
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Unauthorized — Invalid token",
    });
  }
};

module.exports = verifyToken;
