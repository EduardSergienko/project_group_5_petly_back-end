const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
let tempDir;
if (process.env.DEV && process.env.DEV === "Yes") {
	tempDir = path.join(__dirname, `../../tmp/`);
} else {
	tempDir = "/tmp/";
}

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
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/webp"
	) {
		cb(null, true);
	} else {
		const error = { message: "Unsupported file format" };
		cb(error, false);
	}
};

const uploadAvatarMiddleware = multer({
	storage,
	limits: { fileSize: 3000000 },
	fileFilter,
});

module.exports = {
	uploadAvatarMiddleware,
};
