const { ApiErrorsTemplate } = require("../helpers/errors");

const {
  CreateUser,
  getCurrentUser,
  logout,
  login,
  updateUser,
  updateAvatar,
} = require("../services/users-service");
const fs = require("fs/promises");
// const path = require("path");

const registerСontroller = async (req, res) => {
  const { email, password, name, location, phone } = req.body;

  const result = await CreateUser(email, password, name, location, phone);

  if (result.status === Number("409")) {
    throw new ApiErrorsTemplate(409, "Email or phone in use");
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

const updateDataUserСontroller = async (req, res) => {
  const { id } = req.user;

  if (req.file) {
    const userUrl = {
      pathAvatar: req.file.path,
    };

    req.body.avatarURL = await updateAvatar(id, userUrl);
    if (!req.body.avatarURL) {
      throw new ApiErrorsTemplate(400, "Error");
    }
  }

  const data = await updateUser(id, req.body);

  if (!data) {
    await fs.unlink(req.body.avatarURL);
    throw new ApiErrorsTemplate(400, "Error");
  }
  res.status(201).json({ data });
};

module.exports = {
  registerСontroller,
  loginСontroller,
  getCurrentСontroller,
  logoutСontroller,
  updateDataUserСontroller,
};
