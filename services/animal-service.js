const { Animal } = require("../db");

const addAnimal = async (filds, owner) => {
  try {
    const result = await Animal.create({ ...filds, owner });
    return result;
  } catch (error) {
    return error;
  }
};

const listAnimal = async (filds, owner) => {
  try {
    const result = await Animal.find({ ...filds, owner });

    return result;
  } catch (error) {
    return error;
  }
};

const removeAnimal = async (_id) => {
  try {
    const result = await Animal.findByIdAndDelete(_id);
    return result;
  } catch (error) {
    return error;
  }
};
module.exports = {
  removeAnimal,
  addAnimal,
  listAnimal,
};
