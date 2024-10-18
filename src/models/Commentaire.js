const { Schema, default: mongoose } = require("mongoose");

const commentaireSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    film: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Film" 
    },
    commentaire: {
        type: String
    },
    archived_comment: {
        type: Boolean,
        default: false,
      },
  },
  { timestamps: true }
);

const Commentaire = mongoose.model("Commentaire", commentaireSchema);

module.exports = Commentaire;
