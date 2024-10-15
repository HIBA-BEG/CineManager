const { Schema, default: mongoose } = require("mongoose");

const filmSchema = new Schema({
  titre: {
    type: String,
    required: true,
  },
  genre: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Genre',
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
  dateSortie: {
    type: Date,
  },
  producer: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Public", "Private"],
    default: "Public",
    required: true,
  },
  video: {
    type: String,
  },
  isStreamed: {
    type: Boolean,
    default: false,
  },
  releaseStreamDate: {
    type: Date,
  },

});

const filmModel = mongoose.model("Film", filmSchema);

module.exports = filmModel;
