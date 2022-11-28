const getFriends = require("../services/friends");
const { ApiErrorsTemplate } = require("../helpers/errors");

const getFriendsController = async (req, res) => {
  const data = await getFriends();

  if (!data.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({ data });
};

module.exports = getFriendsController;
