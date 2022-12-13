const { ApiErrorsTemplate } = require("../helpers/errors");
const jwt = require("jsonwebtoken");

const accessTokenAge = 900;
const refreshTokenTokenAge = 120 * 120;

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof ApiErrorsTemplate) {
    return res.status(error.status).json({ message: error.message });
  }

  res.status(500).json({ message: error.message });
};

const createTokens = (id) => ({
  accessToken: jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: `${accessTokenAge}s`,
  }),
  refreshToken: jwt.sign({ id }, process.env.SECRET_KEY_REFRESH, {
    expiresIn: `${refreshTokenTokenAge}s`,
  }),
});

module.exports = {
  asyncWrapper,
  errorHandler,
  createTokens,
  refreshTokenTokenAge,
};
