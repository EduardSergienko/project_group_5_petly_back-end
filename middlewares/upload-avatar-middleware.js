const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const tempDir = path.join(__dirname, "..", "tmp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: function (req, file, cb) {
    const [, extension] = file.originalname.split(".");

    cb(null, `${uuidv4()}.${extension}`);
  },
});

const uploadAvatarMiddleware = multer({ storage });

module.exports = {
  uploadAvatarMiddleware,
};
