const express = require("express");
const noticeCtrl = require("../../controllers/notices.js");
const { asyncWrapper } = require("../../helpers/api-helpers");
const validateFormData = require("../../middlewares/validate-formdata-middleware");
const { noticeSchema } = require("../../helpers/joi-validation");
const { authenticate } = require("../../middlewares/auth-middleware");
const {
  uploadAvatarMiddleware,
} = require("../../middlewares/upload-avatar-middleware");
const router = express.Router();

router.get(
  "/category/search",
  asyncWrapper(noticeCtrl.getSearchNoticeController)
);

router.get(
  "/category/:categoryName",
  asyncWrapper(noticeCtrl.getNoticesByCategoryController)
);
router.get("/:noticeId", asyncWrapper(noticeCtrl.getNoticeByIdController));

router.patch(
  "/:noticeId/favorite",
  authenticate,
  asyncWrapper(noticeCtrl.addNoticeToFavoriteController)
);

router.get(
  "/user/favorite",
  authenticate,
  asyncWrapper(noticeCtrl.getFavoriteNoticesController)
);

router.delete(
  "/:noticeId/favorite",
  authenticate,
  asyncWrapper(noticeCtrl.removeFromFavoriteNoticeController)
);

router.post(
  "/",
  authenticate,
  uploadAvatarMiddleware.single("avatar"),
  validateFormData(noticeSchema),
  asyncWrapper(noticeCtrl.addNoticeController)
);

router.get(
  "/user/own",
  authenticate,
  asyncWrapper(noticeCtrl.getUserNoticesController)
);

router.delete(
  "/:noticeId",
  authenticate,
  asyncWrapper(noticeCtrl.removeUserNoticesController)
);

module.exports = router;
