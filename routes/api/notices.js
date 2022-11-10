const express = require("express");
const {
  getNoticesByCategory,
} = require("../../controllers/notices-controller.js");
const { asyncWrapper } = require("../../helpers/api-helpers");
const router = express.Router();

router.get("/", asyncWrapper(getNoticesByCategory));

module.exports = router;
