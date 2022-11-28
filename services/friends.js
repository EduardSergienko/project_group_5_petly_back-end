const Friends = require("../db-models/friends");

const getFriends = async () => {
  try {
    const data = await Friends.find({});
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = getFriends;
