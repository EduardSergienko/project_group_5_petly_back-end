const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handle-save-errors");

const regBirthDay = /(\d{2}).(\d{2}).(\d{4})/;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 7,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "phone"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      default: "00.00.0000",
      formData: regBirthDay,
    },
    myFavorite: [{ type: Schema.Types.ObjectId, ref: "notice" }],
    myAnimal: [{ type: Schema.Types.ObjectId, ref: "animal" }],
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);
const User = model("user", userSchema);

module.exports = User;
