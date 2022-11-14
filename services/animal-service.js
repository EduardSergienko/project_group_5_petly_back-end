const { Animal } = require("../db");

const removeAnimal = async (_id) => {
  try {
    const result = await Animal.findByIdAndDelete(_id);
    return result;
  } catch (error) {}
};

const addAnimal = async (_id) => {
  try {
    const result = await Animal.create({ owner: _id });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  removeAnimal,
  addAnimal,
};
