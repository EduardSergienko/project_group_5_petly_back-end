const { Notice } = require("../db-models/notices");
const User = require("../db-models/user");
const fs = require("fs").promises;
const uploadAvatar = require("../helpers/cloudinary");

const modelNotice = {
  title: 1,
  category: 1,
  breed: 1,
  location: 1,
  petImageUrl: 1,
  birthDate: 1,
  price: 1,
};

const getSearchNotice = async (noticeTitle, category) => {
  try {
    const result = Notice.find(
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

      if (avatarURL.error) {
        await fs.unlink(notice.petImageUrl);
        throw new Error("Failed to update avatar");
      }
      const [avatar] = avatarURL;

      notice.petImageUrl = avatar.secure_url;
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
    const data = await Notice.deleteOne({ _id: id, owner });
    return data;
  } catch (error) {
    return error.message;
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
