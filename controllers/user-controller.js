const { ApiErrorsTemplate } = require("../helpers/errors");
const userService = require("../services/user-service");

const addAnimalController = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await userService.addAnimal(req.body, owner);
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
// ====================================================
const listAnimalController = async (req, res) => {
  const { id } = req.user;
  const result = await userService.listAnimal(id);
  if (!result) {
    throw new ApiErrorsTemplate(404, "Not found");
  }
  res.status(200).json({ result });
};

// const getCurrentСontroller = async (req, res) => {
//   const token = req.token;
//   const user = await userService.getCurrentUser(token);

//   if (!user) {
//     throw new ApiErrorsTemplate(401, "Not authorized");
//   }
//   res.status(200).json({ user });
// };
// ================================================
const updateUserByIdСontroller = async (req, res) => {
  const { id } = req.params;
  const response = await userService.updateUser(id, req.body);

  if (!response) {
    throw new ApiErrorsTemplate(404, "Not found");
  }
  res.json(response);
};

const updateAvatarСontroller = async (req, res) => {
  const { id } = req.user;
  const user = {
    pathAvatar: req.file.path,
  };

  const data = await userService.updateAvatar(id, user);
  res.status(201).json({ data });
};

module.exports = {
  addAnimalController,
  removeAnimalController,
  listAnimalController,
  updateAvatarСontroller,
  updateUserByIdСontroller,
  // getCurrentСontroller,
};
