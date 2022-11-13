const { Animal } = require("../../db");

const addAnimal = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Animal.create({ ...req.body, owner });
  // const result = await Animal.create(req.body);
  res.status(201).json(result);
};

module.exports = addAnimal;
