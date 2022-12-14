const { Notice } = require("../db-models/notices");
const User = require("../db-models/user");
const fs = require("fs").promises;
const { uploadAvatar, destroyImage } = require("../helpers/cloudinary");

const modelNotice = {
  title: 1,
  category: 1,
  breed: 1,
  location: 1,
  petImageUrl: 1,
  birthDate: 1,
  price: 1,
};

const getByCategory = async (category, skip, limit) => {
  try {
    const data = await Notice.find({ category }, modelNotice)
      .sort({ createdAt: "desc" })
      .select({ __v: 0 });

    return data;
  } catch (error) {
    return error;
  }
};

const getById = async (id) => {
  try {
    const data = await Notice.find(
      { _id: id },
      { createdAt: 0, updatedAt: 0 }
    ).populate({
      path: "owner",
      select: { email: 1, phone: 1, _id: 0 },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const getFavorite = async (_id) => {
  try {
    const [data] = await User.find({ _id }, { myFavorite: 1 }).populate({
      path: "myFavorite",
      fields: { myFavorite: 1 },
      options: { sort: { created_at: -1 } },
      select: modelNotice,
    });

    return data;
  } catch (error) {
    return error;
  }
};

const addToFavorite = async (_id, noticeId) => {
  try {
    const data = await User.findByIdAndUpdate(
      { _id },
      { $addToSet: { myFavorite: noticeId } },
      {
        fields: { myFavorite: 1 },
        new: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const removeFromFavorite = async (_id, noticeId) => {
  try {
    const data = await User.findByIdAndUpdate(
      { _id },
      { $pull: { myFavorite: noticeId } },
      {
        fields: { myFavorite: 1 },
        new: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const createNotice = async (notice) => {
  try {
    if (notice.petImageUrl) {
      const avatarURL = await uploadAvatar(notice.petImageUrl);
      await fs.unlink(notice.petImageUrl);
      if (avatarURL.error) {
        throw new Error("Failed to update avatar");
      }

      const [avatar] = avatarURL.eager;
      notice.petImageUrl = avatar.secure_url;
      notice.imgPublic_id = avatarURL.public_id;
    }

    const data = await Notice.create({ ...notice });

    return data;
  } catch (error) {
    return error.message;
  }
};

const getUserNotices = async (_id) => {
  try {
    const data = await Notice.find({ owner: _id }, modelNotice).sort({
      createdAt: "desc",
    });
    return data;
  } catch (error) {
    return error;
  }
};

const removeUserNotice = async (owner, id) => {
  try {
    const data = await Notice.findByIdAndDelete({ _id: id, owner });
    await destroyImage(data.imgPublic_id);
    return data;
  } catch (error) {
    return error.message;
  }
};

const getSearchNotice = async (noticeTitle, category, id = "") => {
  try {
    if (id && category === "own") {
      const result = await Notice.find(
        {
          owner: id,
          title: { $regex: noticeTitle, $options: "i" },
        },
        modelNotice
      );
      return result;
    }

    if (id && category === "favorite") {
      const [{ myFavorite }] = await User.find(
        { _id: id },
        { myFavorite: 1 }
      ).populate({
        path: "myFavorite",
        fields: { myFavorite: 1 },
        select: modelNotice,
        match: { title: { $regex: noticeTitle, $options: "i" } },
      });

      return myFavorite;
    }

    const result = await Notice.find(
      {
        title: { $regex: noticeTitle, $options: "i" },
        category: category,
      },
      modelNotice
    );
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getByCategory,
  getById,
  addToFavorite,
  getFavorite,
  removeFromFavorite,
  createNotice,
  getUserNotices,
  removeUserNotice,
  getSearchNotice,
};
