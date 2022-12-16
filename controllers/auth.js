const cookie = require("cookie");
const { ApiErrorsTemplate } = require("../helpers/errors");
const { createUser, login } = require("../services/auth");
const {
  refreshTokenTokenAge,
  createTokens,
} = require("../helpers/api-helpers");

const registerСontroller = async (req, res) => {
  const { email, password: regPassword, name, location, phone } = req.body;

  const {
    result: { password, ...data },
    accessToken,
    refreshToken,
  } = await createUser(email, regPassword, name, location, phone);

  if (data.status === Number("409")) {
    throw new ApiErrorsTemplate(409, "Email or phone in use");
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", refreshToken, {
      domain: "find-your-awesome-petly.netlify.app",
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: refreshTokenTokenAge,
    })
  );

  res.status(200).json({
    result: data,
    token: accessToken,
  });
};

const loginСontroller = async (req, res) => {
  const { email: userEmail, password: loginPassword } = req.body;

  const {
    result: { password, ...data },
    accessToken,
    refreshToken,
  } = await login(userEmail, loginPassword);

  if (!accessToken) {
    throw new ApiErrorsTemplate(401, "Email or password is wrong");
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", refreshToken, {
      domain: "find-your-awesome-petly.netlify.app",
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: refreshTokenTokenAge,
    })
  );

  res.status(201).json({
    result: data,
    token: accessToken,
  });
};

const refreshTokenController = (req, res) => {
  const { accessToken, refreshToken } = createTokens(req.user.id);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", refreshToken, {
      domain: "find-your-awesome-petly.netlify.app",
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60,
    })
  );

  res.send({ accessToken });
};

const logoutСontroller = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", "", {
      domain: "find-your-awesome-petly.netlify.app",
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    })
  );
  res.sendStatus(200);
};

module.exports = {
  registerСontroller,
  loginСontroller,
  logoutСontroller,
  refreshTokenController,
};
