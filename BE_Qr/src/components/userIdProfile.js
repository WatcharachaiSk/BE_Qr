const { Profiles } = require("../model/index.model");

const getIdProfile = async (req, res, next) => {
  const userUserId = await res.locals.user_id;
  const profile = await Profiles.findOne({ where: { userUserId: userUserId } });
  if (profile) {
    res.profilePfId = profile.pf_id;
    next();
  } else {
    return res.status(401).send(" You don't have a profile. ");
  }
};

module.exports = getIdProfile;
