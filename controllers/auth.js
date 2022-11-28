const { ApiErrorsTemplate } = require("../helpers/errors");

const { CreateUser, logout, login } = require("../services/auth");

const registerСontroller = async (req, res) => {
  const { email, password: regPassword, name, location, phone } = req.body;

  const { password, ...result } = await CreateUser(
    email,
    regPassword,
    name,
    location,
    phone
  );

  if (result.status === Number("409")) {
    throw new ApiErrorsTemplate(409, "Email or phone in use");
  }
  res.status(201).json({
    result,
  });
};

const loginСontroller = async (req, res) => {
  const { email: userEmail, password: loginPassword } = req.body;

  const { password, ...result } = await login(userEmail, loginPassword);

  if (!result.token) {
    throw new ApiErrorsTemplate(401, "Email or password is wrong");
  }

  res.status(201).json({
    result,
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

module.exports = {
  registerСontroller,
  loginСontroller,
  logoutСontroller,
};
