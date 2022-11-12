const { ApiErrorsTemplate } = require("../helpers/errors");
const User = require("../db/user-model");
const { CreateUser, CreateToken } = require("../services/users-service");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password, name, location, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new ApiErrorsTemplate(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  const result = await CreateUser(email, hashPassword, name, location, phone);
  res.status(201).json({
    email: result.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiErrorsTemplate(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new ApiErrorsTemplate(401, "Email or password is wrong");
  }

  const token = await CreateToken(user);

  res.status(201).json({
    token,
    email: user.email,
  });
};
const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.status(201).json({
    name,
    email,
  });
};
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "Logout success",
  });
};
module.exports = {
  register,
  login,
  getCurrent,
  logout,
};
