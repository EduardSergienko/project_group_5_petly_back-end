const cloudinary = require("./cloudinary-config");

const uploadAvatar = async (path, id = "") => {
  try {
    const data = await cloudinary.v2.uploader.upload(path, {
      public_id: id,
      overwrite: true,
      eager: [{ width: 350, height: 288, crop: "fill" }],
    });
    return data;
  } catch (error) {
    return error;
  }
};

const destroyImage = async (publicId) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (error) {
    return new Error();
  }
};
module.exports = { uploadAvatar, destroyImage };
