const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const friendsShema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  addressUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  workDays: {
    type: [Object],
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

friendsShema.post("save", handleSaveErrors);

const Friends = model("friends", friendsShema);

module.exports = Friends;
