const User = require("../db/user-model");
const jwt = require("jsonwebtoken");
// const { token } = require("morgan");
const { SECRET_KEY } = process.env;

const CreateUser = async (email, hashPassword, name, location, phone) => {
  const result = await User.create({
    email,
    password: hashPassword,
    name,
    location,
    phone,
  });
  return result;
};
const CreateToken = async (user) => {
  const payload = {
    id: user._id,
  };
  console.log(SECRET_KEY);
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  return token;
};
module.exports = {
  CreateUser,
  CreateToken,
};
