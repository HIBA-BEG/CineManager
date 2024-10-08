const { Schema, default: mongoose } = require("mongoose");

const filmSchema = new Schema({
  titre: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  affiche: {
    type: String,
  },
  duree: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  archived_film: {
    type: Boolean,
    default: false,
  },
});

const filmModel = mongoose.model("Film", filmSchema);

module.exports = filmModel;
