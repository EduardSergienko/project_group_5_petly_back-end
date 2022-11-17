const User = require("../db/user-model");
const bcrypt = require("bcryptjs");
const { createToken } = require("../helpers/api-helpers");
const gravatar = require("gravatar");

const CreateUser = async (email, password, name, location, phone) => {
  try {
    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(
      `${email}`,
      { protocol: "https", s: "240" },
      true
    );
    const user = new User({
      email,
      password: hashPassword,
      name,
      location,
      phone,
      avatarURL,
    });

    const token = createToken(user._id);
    user.token = token;
    await user.save();

    return user;
  } catch (error) {
    return error;
  }
};

const login = async (email, password) => {
  try {
    const [result] = await User.find({ email }).populate({
      path: "myAnimal",
    });

    if (!(await bcrypt.compare(password, result.password))) {
      throw new Error();
    }

    const token = createToken(result._id);

    result.token = token;
    await result.save();

    return result;
  } catch (error) {
    return error.message;
  }
};

const logout = async (_id) => {
  try {
    await User.findByIdAndUpdate(_id, { token: "" });
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  CreateUser,
  logout,
  login,
};
