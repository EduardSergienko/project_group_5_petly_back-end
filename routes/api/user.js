const express = require("express");

const { authenticate } = require("../../middlewares/auth-middleware");
const { asyncWrapper } = require("../../helpers/api-helpers");
const ctrl = require("../../controllers/user");
const {
  updateUserSchema,
  addAnimalJoiSchema,
} = require("../../helpers/joi-validation");
const validateBody = require("../../middlewares/validate-body");
const isValidIdMiddleware = require("../../middlewares/is-valid-id-middleware");
const updateReqBodyAvatar = require("../../middlewares/update-user-middleware");
const {
  uploadAvatarMiddleware,
} = require("../../middlewares/upload-avatar-middleware");
const validateFormData = require("../../middlewares/validate-formdata-middleware");

const router = express.Router();

router.get(
  "/current",
  authenticate,
  asyncWrapper(ctrl.getCurrentUserController)
);

router.post(
  "/animal",
  authenticate,
  uploadAvatarMiddleware.single("avatar"),
  validateFormData(addAnimalJoiSchema),
  asyncWrapper(ctrl.addAnimalController)
);

router.patch(
  "/:id",
  authenticate,
  isValidIdMiddleware,
  uploadAvatarMiddleware.single("avatar"),
  updateReqBodyAvatar,
  validateBody(updateUserSchema),
  asyncWrapper(ctrl.updateDataUserСontroller)
);

router.delete(
  "/animal/:id",
  authenticate,
  isValidIdMiddleware,
  asyncWrapper(ctrl.removeAnimalController)
);

module.exports = router;
