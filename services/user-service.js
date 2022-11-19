const path = require("path");
const fs = require("fs/promises");
const User = require("../db/user-model");
const { Animal } = require("../db/animal-model");
const resizeAvatar = require("../helpers/resize-avatar");
const avatarsDir = path.join(__dirname, "..", "public", "avatars");

const addAnimal = async (fields, owner) => {
  try {
    const avatarName = `avatar-${new Date().getTime().toString()}.png`;
    const newAvatarPath = path.resolve(`${avatarsDir}/${avatarName}`);
    await resizeAvatar(fields.avatarURL);
    await fs.rename(fields.avatarURL, newAvatarPath);

    fields.avatarURL = path.join("avatars", avatarName);
    const result = await Animal.create({ ...fields });
    await User.findByIdAndUpdate(
      { _id: owner },
      { $addToSet: { myAnimal: result._id } }
    );

    return result;
  } catch (error) {
    return error.message;
  }
};

const getCurrentUser = async (_id) => {
  try {
    const result = await User.find(
      { _id },
      { createdAt: 0, updatedAt: 0, password: 0 }
    ).populate({
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
      {
        new: true,
        select: {
          myFavorite: 0,
          myAnimal: 0,
          createdAt: 0,
          updatedAt: 0,
          password: 0,
          token: 0,
        },
      }
    );
    return responce;
  } catch (error) {
    return error.message;
  }
};

const updateAvatar = async (_id, user) => {
  try {
    const avatarName = `${_id}avatar.png`;
    const newAvatarPath = path.resolve(`${avatarsDir}/${avatarName}`);
    await resizeAvatar(user.pathAvatar);
    await fs.rename(user.pathAvatar, newAvatarPath);
    const avatarURL = path.join("avatars", avatarName);
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
