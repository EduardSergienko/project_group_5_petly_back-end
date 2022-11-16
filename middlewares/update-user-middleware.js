const updateUserMiddleware = (req, res, next) => {
  if (req.file) {
    req.body.avatarURL = req.file.path;
  }

  Object.keys(req.body).forEach((key) => {
    if (req.body[key] === "") {
      delete req.body[key];
    }
  });

  next();
};

module.exports = updateUserMiddleware;
