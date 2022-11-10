const { Notice } = require("../db/notices-model");

const listNoticesByCategory = async (category, skip, limit) => {
  const data = await Notice.find({ category })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);
  return data;
};

module.exports = {
  listNoticesByCategory,
};
