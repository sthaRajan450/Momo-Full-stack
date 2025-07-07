// middelwares/isAdmin.js
const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied. Admins only.",
  });
};

module.exports = isAdmin;
