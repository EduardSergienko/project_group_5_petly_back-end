const express = require("express");

const { authenticate } = require("../../middlewares/auth-middleware");
const { asyncWrapper } = require("../../helpers/api-helpers");
const ctrl = require("../../controllers/user-controller");
const { updateUserSchema } = require("../../helpers/joi-validation");
const { addAnimalJoiSchema } = require("../../db/animal-model");
const validateBody = require("../../middlewares/validate-body");
const { isValidId } = require("../../middlewares/is-valid-id");
const isValidIdMiddleware = require("../../middlewares/isValidId-middleware");
const {
  uploadAvatarMiddleware,
} = require("../../middlewares/upload-avatar-middleware");

const router = express.Router();

// router.get("/", authenticate, asyncWrapper(ctrl.usersPersonalInfoController));
router.get("/", authenticate, asyncWrapper(ctrl.listAnimalController));

// router.get("/current", authenticate, asyncWrapper(ctrl.getCurrentСontroller));

router.post(
  "/",
  authenticate,
  validateBody(addAnimalJoiSchema),
  asyncWrapper(ctrl.addAnimalController)
);

router.patch(
  "/:id",
  authenticate,
  isValidIdMiddleware,
  validateBody(updateUserSchema),
  asyncWrapper(ctrl.updateUserByIdСontroller)
);

router.patch(
  "/user/avatars",
  authenticate,
  uploadAvatarMiddleware.single("avatar"),
  validateBody(updateUserSchema),
  asyncWrapper(ctrl.updateAvatarСontroller)
);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  asyncWrapper(ctrl.removeAnimalController)
);

module.exports = router;
