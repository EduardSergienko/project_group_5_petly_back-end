const fs = require("fs/promises");
const path = require("path");
const { ApiErrorsTemplate } = require("../helpers/errors");
const userService = require("../services/user-service");
const { Animal } = require("../db/animal-model");

const addAnimalController = async (req, res) => {
  const { id: owner } = req.user;
  const result = await userService.addAnimal(req.body, owner);
  // console.log(req.body);
  // console.log(req.file);
  // if (result === "Unsupported MIME type") {
  //   throw new ApiErrorsTemplate(400, "Unsupported MIME type");
  // }

  res.status(201).json(result);
};

const removeAnimalController = async (req, res) => {
  const { id } = req.params;
  const result = await userService.removeAnimal(id);
  if (!result) {
    throw ApiErrorsTemplate(404, "Not found");
  }
  res.json({
    message: "Animal remove",
  });
};

const getCurrentUserController = async (req, res) => {
  const { id } = req.user;
  const result = await userService.getCurrentUser(id);
  if (!result) {
    throw new ApiErrorsTemplate(404, "Not found");
  }
  res.status(200).json({ result });
};

const updateDataUserСontroller = async (req, res) => {
  const { id } = req.user;

  if (req.file) {
    const userUrl = {
      pathAvatar: req.file.path,
    };

    req.body.avatarURL = await userService.updateAvatar(id, userUrl);
    if (!req.body.avatarURL.length) {
      throw new ApiErrorsTemplate(400, "Failed to update avatar");
    }
  }

  const data = await userService.updateUser(id, req.body);

  if (!data) {
    await fs.unlink(req.body.avatarURL);
    throw new ApiErrorsTemplate(400, "Failed to update user data");
  }
  res.status(201).json({ data });
};

const avatarAnimalDir = path.join(__dirname, "../", "public", "animal-avatars");

const updateAvatarСontroller = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarAnimalDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await Animal.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
  }
  // const { id } = req.user;
  // const user = {
  //   pathAvatar: req.file.path,
  // };

  const data = await userService.updateAvatar(id, user);
  res.status(201).json({ data });
};

module.exports = {
  addAnimalController,
  removeAnimalController,
  getCurrentUserController,
  updateAvatarСontroller,
  updateDataUserСontroller,
};
