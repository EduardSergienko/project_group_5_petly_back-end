const express = require("express");
const noticeCtrl = require("../../controllers/notices-controller.js");
const { asyncWrapper } = require("../../helpers/api-helpers");
const router = express.Router();

router.get(
  "/category/:categoryName",
  asyncWrapper(noticeCtrl.getNoticesByCategoryController)
);
router.get("/:id", asyncWrapper(noticeCtrl.getNoticeByIdController));

module.exports = router;
