const mongoose = require("mongoose");

const noticeScheme = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: [true, "Tittle is required"],
      minlength: 2,
      maxlength: 48,
    },
    petName: {
      type: String,
      minlength: 2,
      maxlength: 16,
    },
    birthDate: {
      type: Date,
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 24,
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
      min: 1,
      required: [true, "Price is required"],
    },
    petImageUrl: {
      type: String,
    },
    comments: {
      type: String,
      minlength: 8,
      maxlength: 120,
      required: [true, "Comments is required"],
    },
    category: {
      type: String,
      enum: ["sell", "lost-found", "for-free"],
      default: "sell",
      required: [true, "Category is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Notice = mongoose.model("notice", noticeScheme);

module.exports = {
  Notice,
};
