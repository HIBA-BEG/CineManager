const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  motdepasse: {
    type: String,
    required: true,
  },
  archived_user: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["Client", "Administrateur"],
    required: true,
  },

});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
