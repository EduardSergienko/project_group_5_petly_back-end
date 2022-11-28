const express = require("express");
const router = express.Router();
const {
  getNewsController,
  searchNewsController,
} = require("../../controllers/news");
const { asyncWrapper } = require("../../helpers/api-helpers");

router.get("/", asyncWrapper(getNewsController));
router.get("/search", asyncWrapper(searchNewsController));

module.exports = router;
