const Animal = require("../../db/animal-model");

const addAnimal = async (req, res) => {
  const result = await Animal.create(req.body);
  res.status(201).json(result);
};

module.exports = addAnimal;
