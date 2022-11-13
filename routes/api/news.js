const express = require("express");
const router = express.Router();
const getNewsController = require("../../controllers/news-controller");
const { asyncWrapper } = require("../../helpers/api-helpers");

router.get("/", asyncWrapper(getNewsController));

module.exports = router;
