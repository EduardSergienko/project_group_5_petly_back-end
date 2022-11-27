const cloudinary = require("./cloudinary-config");

const uploadAvatar = async (path) => {
  try {
    const { eager } = await cloudinary.v2.uploader.upload(path, {
      eager: [{ width: 350, height: 288, crop: "fill" }],
    });

    return eager;
  } catch (error) {
    return error;
  }
};
module.exports = uploadAvatar;
