const notices = require("../services/notices");
const { ApiErrorsTemplate } = require("../helpers/errors");

const getSearchNoticeController = async (req, res) => {
  const { category, title } = req.query;

  const result = await notices.getSearchNotice(title, category);

  if (!result.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }
  res.json(result);
};

const getNoticesByCategoryController = async (req, res) => {
  const { categoryName: category } = req.params;

  const data = await notices.getByCategory(category);

  if (!data.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({
    data,
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
  getSearchNoticeController,
};
