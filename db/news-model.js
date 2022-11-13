const mongoose = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const newsScheme = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  url: {
    type: String,
    required: [true, "Pet image is required"],
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
