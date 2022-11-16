// const { ApiErrorsTemplate } = require("../helpers/errors");

const updateUserMiddleware = (req, res, next) => {
  if (req.file) {
    req.body.avatarURL = req.file.path;
  }

  Object.keys(req.body).forEach((key) => {
    if (req.body[key] === "") {
      delete req.body[key];
    }
  });
//   console.log(req.body);
  next();
};

module.exports = updateUserMiddleware;
