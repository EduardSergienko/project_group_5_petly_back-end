const mongoose = require("mongoose");

const noticeScheme = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: [true, "Tittle is required"],
    },
    petName: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    breed: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: [true, "The sex is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    petImageUrl: {
      type: String,
    },
    comments: {
      type: String,
    },
    category: {
      type: String,
      enum: ["sell", "lost/found", "In good hands"],
      default: "sell",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

const Notice = mongoose.model("notice", noticeScheme);

module.exports = {
  Notice,
};
