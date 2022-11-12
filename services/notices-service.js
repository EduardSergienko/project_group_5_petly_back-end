const { Notice } = require("../db/notices-model");

const getByCategory = async (category, skip, limit) => {
  try {
    const data = await Notice.find({ category })
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);
    return data;
  } catch (error) {
    return error;
  }
};

const getById = async (id) => {
  try {
    const data = await Notice.find({ _id: id });
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getByCategory,
  getById,
};
