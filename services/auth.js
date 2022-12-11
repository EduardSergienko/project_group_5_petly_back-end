const User = require("../db-models/user");
const bcrypt = require("bcryptjs");
const { createTokens } = require("../helpers/api-helpers");
const gravatar = require("gravatar");

const createUser = async (email, password, name, location, phone) => {
  try {
    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(
      `${email}`,
      { protocol: "https", s: "240" },
      true
    );
    const user = new User(
      {
        email: email.toLowerCase(),
        password: hashPassword,
        name,
        location,
        phone,
        avatarURL,
      },
      { myFavorite: 0, myAnimal: 0, createdAt: 0 }
    );

    const { accessToken, refreshToken } = createTokens(user._id);

    return { result: user._doc, accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

const login = async (email, password) => {
  try {
    const [result] = await User.find(
      { email: email.toLowerCase() },
      { createdAt: 0 }
    ).populate({
      path: "myAnimal",
    });

    if (!(await bcrypt.compare(password, result.password))) {
      throw new Error();
    }

    const { accessToken, refreshToken } = createTokens(result._id);

    return { result: result._doc, accessToken, refreshToken };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createUser,
  login,
};
