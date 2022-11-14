const { Animal } = require("../db");
const { ApiErrorsTemplate } = require("../helpers/errors");

const addAnimal = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Animal.create({ ...req.body, owner });
  // const result = await Animal.create(req.body);
  res.status(201).json(result);
};

const removeAnimal = async (req, res) => {
  const { id } = req.params;
  const result = await Animal.findByIdAndDelete(id);
  if (!result) {
    throw ApiErrorsTemplate(404, "Not found");
  }
  res.json({
    message: "Animal remove",
  });
};

module.exports = {
  addAnimal,
  removeAnimal,
};
