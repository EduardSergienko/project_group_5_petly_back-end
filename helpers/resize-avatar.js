const Jimp = require("jimp");
const { ApiErrorsTemplate } = require("../helpers/errors");

const resizeAvatar = async (path) => {
  try {
    const avatar = await Jimp.read(`${path}`);
    avatar.resize(350, 288);
    avatar.write(path);
  } catch (error) {
    throw new ApiErrorsTemplate(400, "Unsupported MIME type");
  }
};

module.exports = resizeAvatar;
