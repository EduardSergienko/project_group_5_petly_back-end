const User = require("../db/user-model");

const CreateUser = async (email, password, name, location, phone) => {
  const result = await User.create({
    email,
    password,
    name,
    location,
    phone,
  });
  return result;
};

module.exports = {
  CreateUser,
};
