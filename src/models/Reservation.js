const mongoose = require('mongoose');
const { Schema } = mongoose; 

const Client = require('./Client');
const Seance = require('./Seance');

const reservationSchema = new Schema({
    Client: { 
        type: Schema.Types.ObjectId, 
        ref: 'Client', 
        required: true 
    },
    seance: { 
        type: Schema.Types.ObjectId, 
        ref: 'Seance', 
        required: true 
    },
    statut: { 
      type: String, 
      enum: ['en attente', 'Confirme', 'Annule'], 
      default: 'en attente' 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    archived_reservation: { 
        type: Boolean, 
        default: false 
    }
});

const reservationModel = mongoose.model("reservations", reservationSchema);

module.exports = reservationModel;