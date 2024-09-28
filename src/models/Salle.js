const { Schema, default: mongoose } = require("mongoose");

const siegeSchema = new Schema({
  numero: {
    type: Number,
    required: true,
  },
  etat: {
    type: Boolean,
  default: true, // true hiya dispo & false hiya reserved
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
