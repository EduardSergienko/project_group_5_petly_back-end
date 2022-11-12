const express = require("express");
const notice = require("../../controllers/notices-controller.js");
const { asyncWrapper } = require("../../helpers/api-helpers");
const router = express.Router();

router.get("/:categoryName", asyncWrapper(notice.getNoticesByCategory));
router.get("/:id", asyncWrapper(notice.getNoticeById));

module.exports = router;
