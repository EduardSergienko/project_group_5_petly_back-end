const jwt = require("jsonwebtoken");
const { ApiErrorsTemplate } = require("../helpers/errors");
const { SECRET_KEY, SECRET_KEY_REFRESH } = process.env;

const authenticate = (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [, token] = authorization.split(" ");

    if (!token) {
      throw new ApiErrorsTemplate(401, "Not authorized");
    }

    const user = jwt.verify(token, SECRET_KEY);
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new ApiErrorsTemplate(401, "Not authorized");
    }

    const user = jwt.verify(refreshToken, SECRET_KEY_REFRESH);
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
  verifyRefreshToken,
};
