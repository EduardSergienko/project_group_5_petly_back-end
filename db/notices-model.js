const mongoose = require("mongoose");
const handleSaveErrors = require("../helpers/handle-save-errors");

const regBirthDay = /(\d{2}).(\d{2}).(\d{4})/;

const noticeScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 2,
      maxlength: 48,
    },
    petName: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, "Pet name is required"],
    },
    birthDate: {
      type: String,
      required: [true, "Date of birth is required"],
      formData: regBirthDay,
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 24,
      required: [true, "Breed is required"],
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
      required: [true, "Pet image is required"],
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

noticeScheme.post("save", handleSaveErrors);

const Notice = mongoose.model("notice", noticeScheme);

module.exports = {
  Notice,
};
