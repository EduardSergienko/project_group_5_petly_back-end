const jwt = require("jsonwebtoken");
const { ApiErrorsTemplate } = require("../helpers/errors");
const { SECRET_KEY } = process.env;
// ===============================================
// const { User } = require("../db/user-model"); //
// const RequestError = require("../helpers/RequestError");

// const authenticate = async (req, res, next) => {
//   try {
//     const { authorization = "" } = req.headers;
//     const [bearer, token] = authorization.split(" ");
//     if (bearer !== "Bearer") {
//       throw RequestError(401);
//     }
//     try {
//       const { _id } = jwt.verify(token, SECRET_KEY);
//       const user = await User.findOne(_id);
//       if (!user || !user.token) {
//         // next(Unauthorized(" Unauthorized"));
//         throw Error("Not authorized");
//       }
//       req.user = user;
//       next();
//     } catch (error) {
//       throw RequestError(401, error.message);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// ===============================================
const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [, token] = authorization.split(" ");

    if (!token) {
      throw new ApiErrorsTemplate(401, "Not authorized");
    }

    const user = jwt.verify(token, SECRET_KEY);
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
