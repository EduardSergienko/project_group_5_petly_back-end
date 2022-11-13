const User = require("../db/user-model");
const bcrypt = require("bcryptjs");
const { createToken } = require("../helpers/api-helpers");

const CreateUser = async (email, password, name, location, phone) => {
  try {
    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    const user = new User({
      email,
      password: hashPassword,
      name,
      location,
      phone,
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
    const [user] = await User.find({ email }, { __v: 0, token: 0 });

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error();
    }

    const token = createToken(user._id);

    user.token = token;
    await user.save();

    return user;
  } catch (error) {
    return error.message;
  }
};

const getCurrentUser = async (token) => {
  try {
    const [user] = await User.find({ token });

    return user;
  } catch (error) {
    return error;
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
  getCurrentUser,
  logout,
  login,
};
