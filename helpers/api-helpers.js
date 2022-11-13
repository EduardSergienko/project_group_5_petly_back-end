const { ApiErrorsTemplate } = require("../helpers/errors");
const jwt = require("jsonwebtoken");

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

const createToken = (id) => {
  const payload = {
    id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);

  return token;
};

module.exports = {
  asyncWrapper,
  errorHandler,
  createToken,
};
