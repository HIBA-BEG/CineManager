const { Schema, default: mongoose } = require("mongoose");
const Film = require('./Film'); 
const Salle = require('./Salle');

const seanceSchema = new Schema({
    film: { 
        type: Schema.Types.ObjectId, 
        ref: 'Film', 
        required: true 
    },
  salle: { 
    type: Schema.Types.ObjectId, 
    ref: 'Salle', 
    required: true 
},
  horaire: { 
    type: Date, 
    required: true 
},
  tarif: { 
    type: Number, 
    required: true 
},
  placesDisponibles: { 
    type: Number, 
    required: true 
},
  archived_seance: { 
    type: Boolean, 
    default: false 
}
});

const seanceModel = mongoose.model("seances", seanceSchema);

module.exports = seanceModel;