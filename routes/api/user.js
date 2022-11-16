const express = require("express");

const { authenticate } = require("../../middlewares/auth-middleware");
const { asyncWrapper } = require("../../helpers/api-helpers");
const ctrl = require("../../controllers/user-controller");
const { updateUserSchema } = require("../../helpers/joi-validation");
const { addAnimalJoiSchema } = require("../../db/animal-model");
const validateBody = require("../../middlewares/validate-body");
const isValidIdMiddleware = require("../../middlewares/is-valid-id-middleware");
const updateUserMiddleware = require("../../middlewares/update-user-middleware");
const {
  uploadAvatarMiddleware,
} = require("../../middlewares/upload-avatar-middleware");

const router = express.Router();

router.get(
  "/current",
  authenticate,
  asyncWrapper(ctrl.getCurrentUserController)
);

router.post(
  "/animal/",
  authenticate,
  validateBody(addAnimalJoiSchema),
  asyncWrapper(ctrl.addAnimalController)
);

router.patch(
  "/:id",
  authenticate,
  isValidIdMiddleware,
  uploadAvatarMiddleware.single("avatar"),
  updateUserMiddleware,
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
