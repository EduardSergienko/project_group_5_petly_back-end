const { Schema, model } = require("mongoose");

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
      // maxlength: 32,
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
      //   required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
      //   required: [true, "Verify token is required"],
    },
    myPets: {
      type: Schema.Types.ObjectId,
      ref: "notice",
    },
    myFavorite: {
      type: Schema.Types.ObjectId,
      ref: "notice",
    },
  },

  { versionKey: false, timestamps: true }
);
const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};
userSchema.post("save", handleSaveErrors);
const User = model("user", userSchema);

module.exports = User;
