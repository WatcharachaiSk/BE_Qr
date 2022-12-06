const { Profiles } = require("../../model/index.model");
const checkProfile = async (req, res, next) => {
  // console.log(res.locals.user_id);
  const userUserId = await res.locals.user_id;
  const profile = await Profiles.findOne({ where: { userUserId: userUserId } });

  if (!profile) {
    next();
  } else {
    return res.status(401).send(" You already have a profile ");
    // console.log(profile.userUserId);
  }
};

module.exports = checkProfile;
