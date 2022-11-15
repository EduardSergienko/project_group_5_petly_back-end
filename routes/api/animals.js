const express = require("express");

const ctrl = require("../../controllers/animal-controller");
const { addAnimalJoiSchema } = require("../../db/animal-model");
const { asyncWrapper } = require("../../helpers/api-helpers");
const { authenticate } = require("../../middlewares/auth-middleware");
const { isValidId } = require("../../middlewares/is-valid-id");
const validateBody = require("../../middlewares/validate-body");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validateBody(addAnimalJoiSchema),
  asyncWrapper(ctrl.addAnimalController)
);
router.delete(
  "/:id",
  authenticate,
  isValidId,
  asyncWrapper(ctrl.removeAnimalController)
);

router.get("/", authenticate, asyncWrapper(ctrl.listAnimalController));

module.exports = router;
