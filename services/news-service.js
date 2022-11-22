const News = require("../db/news-model");

const getNews = async (skip, limit) => {
  try {
    const data = await News.find({})
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit);
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = getNews;
