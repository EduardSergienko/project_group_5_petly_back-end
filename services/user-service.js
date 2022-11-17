const fs = require("fs/promises");
const path = require("path");
const User = require("../db/user-model");
const { Animal } = require("../db/animal-model");
const resizeAvatar = require("../helpers/resize-avatar");

const addAnimal = async (fields, owner) => {
  try {
    const newAvatarPath = path.resolve(
      `./user/animal/avatar-${new Date().getTime().toString()}.png`
    );
    await resizeAvatar(fields.petImageUrl);
    await fs.rename(fields.petImageUrl, newAvatarPath);

    fields.petImageUrl = newAvatarPath;

    const result = await Animal.create({ ...fields });
    await User.findByIdAndUpdate(
      { _id: owner },
      { $addToSet: { myAnimal: result._id } }
    );

    return result;
  } catch (error) {
    return error;
  }
};

const getCurrentUser = async (_id) => {
  try {
    const result = await User.find({ _id }).populate({
      path: "myAnimal",
    });
    return result;
  } catch (error) {
    return error;
  }
};

const removeAnimal = async (_id) => {
  try {
    const result = await Animal.findByIdAndDelete(_id);
    return result;
  } catch (error) {
    return error;
  }
};

const updateUser = async (_id, fields) => {
  try {
    const responce = await User.findByIdAndUpdate(
      { _id },
      { ...fields },
      { new: true }
    );
    return responce;
  } catch (error) {
    return error.message;
  }
};

const updateAvatar = async (_id, user) => {
  try {
    const newAvatarPath = path.resolve(`./public/avatars/${_id}avatar.png`);
    await resizeAvatar(user.pathAvatar);
    await fs.rename(user.pathAvatar, newAvatarPath);
    const avatarURL = newAvatarPath;
    return avatarURL;
  } catch (error) {
    await fs.unlink(user.pathAvatar);
    return error.message;
  }
};

module.exports = {
  removeAnimal,
  addAnimal,
  getCurrentUser,
  updateUser,
  updateAvatar,
};
