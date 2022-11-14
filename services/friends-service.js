const Friends = require("../db/friends-model");

const getFriends = async () => {
  try {
    const data = await Friends.find({});
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = getFriends;
