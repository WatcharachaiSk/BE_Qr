const verifyIsAdmin = async (req, res, next) => {
  const isAdmin = await res.locals;
  if (isAdmin.admin) {
    next();
  } else {
    return res.status(401).send("You are not admin");
  }
};

module.exports = verifyIsAdmin;
