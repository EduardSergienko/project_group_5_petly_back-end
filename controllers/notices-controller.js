const { listNoticesByCategory } = require("../services/notices-service");
const { ApiErrorsTemplate } = require("../helpers/errors");

const getNoticesByCategory = async (req, res) => {
  let { page = 1, limit = 8, category = "sell" } = req.query;

  if (page <= 0) {
    throw new ApiErrorsTemplate(400, "Page must be greater then 0");
  }

  limit = parseInt(limit) > 8 ? 8 : parseInt(limit);
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const data = await listNoticesByCategory(category, skip, limit);

  if (!data.length) {
    throw new ApiErrorsTemplate(404, "Not found");
  }

  res.status(200).json({
    data,
    limit,
  });
};

module.exports = {
  getNoticesByCategory,
};
