const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    res.locals = req.user;
    // console.log(res.locals);
    // res.locals.amdin = req.user;
    // return res.status(200).send(req.user.user_id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
};
// {{headers}}{{WebToken}}
module.exports = verifyToken;
