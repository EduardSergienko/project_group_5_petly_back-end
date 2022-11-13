const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const regBirthDay = /(\d{2}).(\d{2}).(\d{4})/;

const animalSchema = new Schema(
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
    // avatarURL: {
    //   type: String,
    //   required: true,
    // },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

animalSchema.post("save", handleSaveErrors);

const addAnimalJoiSchema = Joi.object({
  name: Joi.string().required(),
  birthDay: Joi.string().pattern(regBirthDay).required(),
  breed: Joi.string().required(),
  comments: Joi.string().required(),
});

const Animal = model("animal", animalSchema);

module.exports = {
  Animal,
  addAnimalJoiSchema,
};
