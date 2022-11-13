const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const regBirthDay = /(\d{2}).(\d{2}).(\d{4})/;

const animalSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    dateOfBirth: {
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
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

animalSchema.post("save", handleSaveErrors);

const Animal = model("animal", animalSchema);

model.export = Animal;
