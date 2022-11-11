const { ApiErrorsTemplate } = require("../helpers/errors");
const User = require("../db/user-model");
const { CreateUser } = require("../services/users-service");

const register = async (req, res) => {
  const { email, password, name, location, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new ApiErrorsTemplate(409, "Email in use");
  }
  const result = await CreateUser(email, password, name, location, phone);
  res.status(201).json({
    email: result.email,
  });
};

module.exports = {
  register,
};
