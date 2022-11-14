const { Animal } = require("../db");

const removeAnimal = async (id) => {
  try {
    const result = await Animal.findByIdAndDelete(id);
    return result;
  } catch (error) {}
};

const addAnimal = async () => {
  try {
    const result = await Animal.create({ ...req.body, owner });
  } catch (error) {}
};

module.exports = {
  removeAnimal,
};
