const express = require("express");

const ctrl = require("../../controllers/animalControllers");
const { addAnimalJoiSchema } = require("../../db/animal-model");
const { asyncWrapper } = require("../../helpers/api-helpers");
const { authenticate } = require("../../middlewares/auth-middleware");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validateBody");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validateBody(addAnimalJoiSchema),
  asyncWrapper(ctrl.addAnimal)
);
router.delete("/:id", authenticate, isValidId, asyncWrapper(ctrl.removeAnimal));

module.exports = router;
