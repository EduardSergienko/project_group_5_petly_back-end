const { isValidObjectId } = require("mongoose");
const ApiErrorsTemplate = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    next(ApiErrorsTemplate(404, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
