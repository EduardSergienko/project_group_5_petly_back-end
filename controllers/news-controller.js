const getNews = require("../services/news-service");
const { ApiErrorsTemplate } = require("../helpers/errors");

const getNewsController = async (req, res) => {
  const data = await getNews();

  if (!data.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({ data });
};

module.exports = getNewsController;
