const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/api-helpers");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/auth-controller");
const { authenticate } = require("../../middlewares/auth-middleware");

const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../helpers/joi-validation");

router.post("/register", validateBody(registerSchema), asyncWrapper(register));
router.post("/login", validateBody(loginSchema), asyncWrapper(login));
router.get("/current", authenticate, asyncWrapper(getCurrent));
router.get("/logout", authenticate, asyncWrapper(logout));
module.exports = router;
