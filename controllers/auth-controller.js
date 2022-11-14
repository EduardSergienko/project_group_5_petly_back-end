const { ApiErrorsTemplate } = require("../helpers/errors");
// const User = require("../db/user-model");
// const fs = require("fs/promises");
// const Jimp = require("jimp");
// const path = require("path");
// const resizeAvatar = require("../helpers/resize-avatar");
const {
  CreateUser,
  getCurrentUser,
  logout,
  login,
  updateUser,
  updateAvatar,
} = require("../services/users-service");

const registerСontroller = async (req, res) => {
  const { email, password, name, location, phone } = req.body;

  const result = await CreateUser(email, password, name, location, phone);

  if (result.code === "409") {
    throw new ApiErrorsTemplate(409, "Email in use");
  }
  res.status(201).json({
    result,
  });
};

const loginСontroller = async (req, res) => {
  const { email: userEmail, password } = req.body;

  const { token, email } = await login(userEmail, password);

  if (!token) {
    throw new ApiErrorsTemplate(401, "Email or password is wrong");
  }

  res.status(201).json({
    token,
    email,
  });
};
const getCurrentСontroller = async (req, res) => {
  const token = req.token;
  const user = await getCurrentUser(token);

  if (!user) {
    throw new ApiErrorsTemplate(401, "Not authorized");
  }
  res.status(200).json({
    user,
  });
};
const logoutСontroller = async (req, res) => {
  const { id } = req.user;

  const response = await logout(id);

  if (response) {
    throw new ApiErrorsTemplate(401, "Not authorized");
  }
  res.status(204).json({
    message: "Logout success",
  });
};
const updateUserByIdСontroller = async (req, res) => {
  const { id } = req.params;
  const response = await updateUser(id, req.body);

  if (!response) {
    throw new ApiErrorsTemplate(404, "Not found");
  }
  res.json(response);
};
const updateAvatarСontroller = async (req, res) => {
  // console.log(req.file);
  const { id } = req.user;
  const user = {
    pathAvatar: req.file.path,
  };
  // console.log(user);

  const data = await updateAvatar(id, user);
  res.status(201).json({ data });
};
module.exports = {
  registerСontroller,
  loginСontroller,
  getCurrentСontroller,
  logoutСontroller,
  updateUserByIdСontroller,
  updateAvatarСontroller,
};
