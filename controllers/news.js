const news = require("../services/news");
const { ApiErrorsTemplate } = require("../helpers/errors");

const getNewsController = async (req, res) => {
  let { page = 1, limit = 9 } = req.query;

  if (page <= 0) {
    throw new ApiErrorsTemplate(400, "Page must be greater then 0");
  }

  limit = parseInt(limit) > 9 ? 9 : parseInt(limit);
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const data = await news.getNews(skip, limit);

  if (!data.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({ data });
};

const searchNewsController = async (req, res) => {
  const { title } = req.query;

  const result = await news.searchNews(title);

  if (!result.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getNewsController,
  searchNewsController,
};
