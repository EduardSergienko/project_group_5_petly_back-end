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
      required: [true, "city_region is required"],
    },
    phone: {
      type: String,
      required: [true, "phone"],
      unique: true,
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

    myPets: {
      type: Schema.Types.ObjectId,
      ref: "notice",
    },
    myFavorite: [{ type: Schema.Types.ObjectId, ref: "notice" }],
  },

  { versionKey: false, timestamps: true }
);

// const handleSaveErrors = (error, data, next) => {
//   const { name, code } = error;
//   error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
//   next();
// };
userSchema.post("save", handleSaveErrors);
const User = model("user", userSchema);

module.exports = User;
