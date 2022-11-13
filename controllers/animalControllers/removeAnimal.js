const { Animal } = require("../../db");
const { RequestError } = require("../../helpers");

const removeAnimal = async (req, res) => {
  const { id } = req.params;
  const result = await Animal.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    message: "Animal remove",
  });
};

module.exports = removeAnimal;
