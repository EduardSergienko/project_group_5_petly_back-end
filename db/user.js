const { Schema, model } = require("mongoose");
const Joi = require("joi");
const userShema = new Schema(
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
      maxlength: 32,
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
  },

  { versionKey: false, timestamps: true }
);
const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};
userShema.post("save", handleSaveErrors);
const User = model("user", userShema);
const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(7).max(32).required(),
  name: Joi.string().required(),
  location: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = { User, userSchema };
