const { Schema, default: mongoose } = require("mongoose");

const User = require("./User");

const adminSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  permissions: [
    {
      type: String,
    },
  ],
});

const adminModel = mongoose.model("administrateurs", adminSchema);

module.exports = adminModel;
