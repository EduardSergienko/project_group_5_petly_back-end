const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/api-helpers");
const {
  registerСontroller,
  loginСontroller,
  // getCurrentСontroller,
  logoutСontroller,
  // <<<<<<< HEAD
  // updateUserByIdСontroller,
  // updateAvatarСontroller,
} = require("../../controllers/auth-controller");

// =======
//   updateDataUserСontroller,
// } = require("../../controllers/auth-controller");
// const updateUserMiddleware = require("../../middlewares/update-user-middleware");
// >>>>>>> e3b920864620ef66a171dab4dbce7c8f7ce38cb9
const { authenticate } = require("../../middlewares/auth-middleware");
// const isValidIdMiddleware = require("../../middlewares/isValidId-middleware");
// const {
//   uploadAvatarMiddleware,
// } = require("../../middlewares/upload-avatar-middleware");

const validateBody = require("../../middlewares/validate-body");
const {
  registerSchema,
  loginSchema,
  // updateUserSchema,
} = require("../../helpers/joi-validation");

router.post(
  "/register",
  validateBody(registerSchema),
  asyncWrapper(registerСontroller)
);
router.post("/login", validateBody(loginSchema), asyncWrapper(loginСontroller));
// router.get("/current", authenticate, asyncWrapper(getCurrentСontroller));
router.get("/logout", authenticate, asyncWrapper(logoutСontroller));
// <<<<<<< HEAD
// router.patch(
//   "/:id",
//   authenticate,
//   isValidIdMiddleware,
//   validateBody(updateUserSchema),
//   asyncWrapper(updateUserByIdСontroller)
// );
// router.patch(
//   "/user/avatars",
//   authenticate,
//   uploadAvatarMiddleware.single("avatar"),
//   validateBody(updateUserSchema),
//   asyncWrapper(updateAvatarСontroller)
// );

// =======

// router.patch(
//   "/user/:id",
//   authenticate,
//   isValidIdMiddleware,
//   uploadAvatarMiddleware.single("avatar"),
//   updateUserMiddleware,
//   validateBody(updateUserSchema),
//   asyncWrapper(updateDataUserСontroller)
// );
// >>>>>>> e3b920864620ef66a171dab4dbce7c8f7ce38cb9
module.exports = router;
