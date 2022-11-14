const { Animal } = require("../db");

const removeAnimal = async (_id) => {
  try {
    const result = await Animal.findByIdAndDelete(_id);
    return result;
  } catch (error) {
    return error;
  }
};

const addAnimal = async (filds, owner) => {
  try {
    const result = await Animal.create({ ...filds, owner });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  removeAnimal,
  addAnimal,
};
