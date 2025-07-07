const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
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
 

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

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
