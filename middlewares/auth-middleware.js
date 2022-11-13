const jwt = require("jsonwebtoken");
const { ApiErrorsTemplate } = require("../helpers/errors");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [, token] = authorization.split(" ");

    if (!token) {
      throw new ApiErrorsTemplate(401, "Not authorized");
    }

    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
