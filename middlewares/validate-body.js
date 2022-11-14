const { ApiErrorsTemplate } = require("../helpers/errors");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new ApiErrorsTemplate(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
