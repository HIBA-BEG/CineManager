const { Schema, default: mongoose } = require("mongoose");
const User = require("./User");

const clientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  numero_telephone: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
});

const clientModel = mongoose.model("clients", clientSchema);

module.exports = clientModel;
