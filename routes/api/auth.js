const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/api-helpers");
const {
  registerСontroller,
  loginСontroller,
  logoutСontroller,
} = require("../../controllers/auth");
const { authenticate } = require("../../middlewares/auth-middleware");
const validateBody = require("../../middlewares/validate-body");
const { registerSchema, loginSchema } = require("../../helpers/joi-validation");

router.post(
  "/register",
  validateBody(registerSchema),
  asyncWrapper(registerСontroller)
);
router.post("/login", validateBody(loginSchema), asyncWrapper(loginСontroller));
router.get("/logout", authenticate, asyncWrapper(logoutСontroller));
module.exports = router;
