const { isValidObjectId } = require("mongoose");

const { ApiErrorsTemplate } = require("../helpers/errors");

const isValidIdMiddleware = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    next(new ApiErrorsTemplate(404, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidIdMiddleware;
