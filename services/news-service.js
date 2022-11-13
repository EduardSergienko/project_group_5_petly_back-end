const News = require("../db/news-model");

const getNews = async () => {
  try {
    const data = await News.find({});
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = getNews;
