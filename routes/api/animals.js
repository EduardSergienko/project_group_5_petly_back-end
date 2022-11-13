const express = require("express");
const animalModel = require("../../db/animal-model");
const ApiErrorsTemplate = require("../../helpers/errors");
const { asyncWrapper } = require("../../helpers/api-helpers");

const router = express.Router();

router.get("/");

router.post("/", asyncWrapper());

router.delete("/:id");

module.exports = router;
