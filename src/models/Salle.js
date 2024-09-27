const { Schema, default: mongoose } = require("mongoose");

const siegeSchema = new Schema({
  numero: {
    type: Number,
    required: true,
  },
  etat: {
    type: String,
    enum: ["disponible", "reserved", "occupied"],
    default: "disponible",
  },
});

const salleSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  capacite: {
    type: Number,
    required: true,
  },
  sieges: [siegeSchema],
  type: {
    type: String,
    required: true,
  },

  archived_salle: {
    type: Boolean,
    default: false,
  },
});

const salleModel = mongoose.model("Salle", salleSchema);

module.exports = salleModel;
