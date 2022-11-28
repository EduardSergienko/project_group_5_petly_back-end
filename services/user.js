const fs = require("fs/promises");
const User = require("../db-models/user");
const { Animal } = require("../db-models/animal");
const uploadAvatar = require("../helpers/cloudinary");

const addAnimal = async (fields, owner) => {
  try {
    if (fields.avatarURL) {
      const avatarURL = await uploadAvatar(fields.avatarURL);

      if (avatarURL.error) {
        await fs.unlink(fields.avatarURL);
        throw new Error("Failed to update avatar");
      }
      const [avatar] = avatarURL;

      fields.avatarURL = avatar.secure_url;
    }

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
    if (fields.avatarURL) {
      const avatarURL = await uploadAvatar(fields.avatarURL);

      if (avatarURL.error) {
        await fs.unlink(fields.avatarURL);
        throw new Error("Failed to update avatar");
      }
      const [avatar] = avatarURL;

      fields.avatarURL = avatar.secure_url;
    }

    const response = await User.findByIdAndUpdate(
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
    return response;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  removeAnimal,
  addAnimal,
  getCurrentUser,
  updateUser,
};
