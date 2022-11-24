const updateReqBodyAvatar = (req, res, next) => {
  if (req.file) {
    req.body.avatarURL = req.file.path;
  }

  next();
};

module.exports = updateReqBodyAvatar;
