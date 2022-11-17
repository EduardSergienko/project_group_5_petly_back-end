const fs = require("fs/promises");

const { ApiErrorsTemplate } = require("../helpers/errors");
const userService = require("../services/user-service");

const addAnimalController = async (req, res) => {
  const { id: owner } = req.user;

  const animal = {
    name: req.body.name,
    birthDay: req.body.birthDa,
    breed: req.body.breed,
    comments: req.body.comments,
    avatarURL: req.body.petImageUrl,
    owner,
  };
  const result = await userService.addAnimal(animal, owner);

  if (result === "Unsupported MIME type") {
    throw new ApiErrorsTemplate(400, "Unsupported MIME type");
  }

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

module.exports = {
  addAnimalController,
  removeAnimalController,
  getCurrentUserController,
  updateDataUserСontroller,
};
