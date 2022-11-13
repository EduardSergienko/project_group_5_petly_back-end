const { ApiErrorsTemplate } = require("../helpers/errors");

const validateFormData = (schema) => {
  const func = (req, res, next) => {
    if (req.file?.path) {
      req.body.petImageUrl = req.file.path;
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(new ApiErrorsTemplate(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateFormData;
