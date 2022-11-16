// const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Joi = require("joi");
const handleSaveErrors = require("../helpers/handle-save-errors");

const regBirthDay =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

const AnimalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    birthDay: {
      type: String,
      require: true,
      formData: regBirthDay,
    },
    breed: {
      type: String,
      require: true,
    },
    comments: {
      type: String,
      require: true,
    },
    avatarURL: {
      type: String,
      // required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

AnimalSchema.post("save", handleSaveErrors);

const addAnimalJoiSchema = Joi.object({
  name: Joi.string().required(),
  birthDay: Joi.string().pattern(regBirthDay).required(),
  breed: Joi.string().required(),
  comments: Joi.string().required(),
});

const Animal = mongoose.model("animal", AnimalSchema);

module.exports = {
  Animal,
  addAnimalJoiSchema,
};
