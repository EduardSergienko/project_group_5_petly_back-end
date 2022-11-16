const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/api-helpers");
const {
  registerСontroller,
  loginСontroller,
  getCurrentСontroller,
  logoutСontroller,
  updateDataUserСontroller,
} = require("../../controllers/auth-controller");
const updateUserMiddleware = require("../../middlewares/update-user-middleware");
const { authenticate } = require("../../middlewares/auth-middleware");
const isValidIdMiddleware = require("../../middlewares/isValidId-middleware");
const {
  uploadAvatarMiddleware,
} = require("../../middlewares/upload-avatar-middleware");

const validateBody = require("../../middlewares/validate-body");
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
} = require("../../helpers/joi-validation");

router.post(
  "/register",
  validateBody(registerSchema),
  asyncWrapper(registerСontroller)
);
router.post("/login", validateBody(loginSchema), asyncWrapper(loginСontroller));
router.get("/current", authenticate, asyncWrapper(getCurrentСontroller));
router.get("/logout", authenticate, asyncWrapper(logoutСontroller));

router.patch(
  "/user/:id",
  authenticate,
  isValidIdMiddleware,
  uploadAvatarMiddleware.single("avatar"),
  updateUserMiddleware,
  validateBody(updateUserSchema),
  asyncWrapper(updateDataUserСontroller)
);
module.exports = router;
