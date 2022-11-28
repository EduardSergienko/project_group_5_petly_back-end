const mongoose = require("mongoose");
const handleSaveErrors = require("../helpers/handle-save-errors");

const newsScheme = new mongoose.Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

newsScheme.post("save", handleSaveErrors);

const News = mongoose.model("new", newsScheme);

module.exports = News;
