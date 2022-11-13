const notices = require("../services/notices-service");
const { ApiErrorsTemplate } = require("../helpers/errors");

const getNoticesByCategoryController = async (req, res) => {
  const { categoryName: category } = req.params;
  let { page = 1, limit = 8 } = req.query;

  if (page <= 0) {
    throw new ApiErrorsTemplate(400, "Page must be greater then 0");
  }

  limit = parseInt(limit) > 8 ? 8 : parseInt(limit);
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const data = await notices.getByCategory(category, skip, limit);

  if (!data.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({
    data,
    limit,
  });
};

const getNoticeByIdController = async (req, res) => {
  const { noticeId: id } = req.params;

  const data = await notices.getById(id);

  if (!data || !data.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({
    data,
  });
};

const getFavoriteNoticesController = async (req, res) => {
  const { id } = req.user;

  const { myFavorite } = await notices.getFavorite(id);

  if (!myFavorite) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({ myFavorite });
};

const addNoticeToFavoriteController = async (req, res) => {
  const { noticeId } = req.params;
  const { id } = req.user;

  if (!id) {
    throw new ApiErrorsTemplate(401, "Not authorized");
  }

  const { myFavorite } = await notices.addToFavorite(id, noticeId);

  if (!myFavorite) {
    throw new ApiErrorsTemplate(400, "Error");
  }

  res.status(201).json({ myFavorite });
};

const removeFromFavoriteNoticeController = async (req, res) => {
  const { noticeId } = req.params;
  const { id } = req.user;

  if (!id) {
    throw new ApiErrorsTemplate(401, "Not authorized");
  }

  const { myFavorite } = await notices.removeFromFavorite(id, noticeId);

  if (!myFavorite) {
    throw new ApiErrorsTemplate(404, "Not found test");
  }

  res.status(200).json({ myFavorite });
};

const addNoticeController = async (req, res) => {
  const { id } = req.user;

  const notice = {
    title: req.body.title,
    petName: req.body.petName,
    birthDate: req.body.birthDate,
    breed: req.body.breed,
    sex: req.body.sex,
    location: req.body.location,
    price: req.body.price,
    petImageUrl: req.body.petImageUrl,
    comments: req.body.comments,
    category: req.body.category,
    owner: id,
  };

  const data = await notices.createNotice(notice);

  if (data === "Unsupported MIME type") {
    throw new ApiErrorsTemplate(400, "Unsupported MIME type");
  }

  if (!data.title) {
    throw new ApiErrorsTemplate(400, "Error");
  }

  res.status(201).json({ data });
};

const getUserNoticesController = async (req, res) => {
  const { id } = req.user;

  const data = await notices.getUserNotices(id);

  if (!data.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({ data });
};

const removeUserNoticesController = async (req, res) => {
  const { noticeId: id } = req.params;
  const { id: owner } = req.user;

  const { deletedCount } = await notices.removeUserNotice(owner, id);

  if (!deletedCount) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({ message: "notice deleted" });
};

module.exports = {
  getNoticesByCategoryController,
  getNoticeByIdController,
  addNoticeToFavoriteController,
  getFavoriteNoticesController,
  removeFromFavoriteNoticeController,
  addNoticeController,
  getUserNoticesController,
  removeUserNoticesController,
};