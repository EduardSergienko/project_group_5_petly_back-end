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

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    const error = { message: "Unsupported file format" };
    cb(error, false);
  }
};

const uploadAvatarMiddleware = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter,
});

module.exports = {
  uploadAvatarMiddleware,
};
