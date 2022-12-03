const verifyIsAdminGet = async (req, res, next) => {
  const user = await res.locals;
  // console.log("user = ", user);
  if (user.admin) {
    res.isAdmin = true;
    next();
  } else {
    res.isAdmin = false;
    next();
  }
};

module.exports = verifyIsAdminGet;
