const verifyAdmin = (req, res, next) => {
    const isAdmin = req.user.userData[7];
  
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Cannot Access. Need Admin Access" });
    }
  
    next();
  };
  
  module.exports = verifyAdmin;