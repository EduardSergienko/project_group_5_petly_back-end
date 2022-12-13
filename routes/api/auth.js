const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/api-helpers");
const {
  registerСontroller,
  loginСontroller,
  logoutСontroller,
  refreshTokenController,
} = require("../../controllers/auth");
const {
  authenticate,
  verifyRefreshToken,
} = require("../../middlewares/auth-middleware");
const validateBody = require("../../middlewares/validate-body");
const { registerSchema, loginSchema } = require("../../helpers/joi-validation");

router.post(
  "/register",
  validateBody(registerSchema),
  asyncWrapper(registerСontroller)
);
router.post("/login", validateBody(loginSchema), asyncWrapper(loginСontroller));
router.get("/logout", authenticate, asyncWrapper(logoutСontroller));
router.get(
  "/refresh",
  verifyRefreshToken,
  asyncWrapper(refreshTokenController)
);
module.exports = router;
