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
    type: Buffer,
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

const filmModel = mongoose.model("films", filmSchema);

module.exports = filmModel;
