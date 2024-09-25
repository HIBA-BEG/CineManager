const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/ModelsExports");

exports.register = async function (req, res) {
  try {
    const newUser = new userModel(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

    const user = await newUser.save();

    user.hash_password = undefined;
    return res.json(user);
  } catch (err) {
    return res.status(400).send({
      message: err,
    });
  }
};

exports.login = async function (req, res) {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user || !user.comparePassword(req.body.password)) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid user or password." });
    }

    const token = jwt.sign(
      { email: user.email, nom: user.nom, prenom: user.prenom, _id: user._id },
      "RESTFULAPIs",
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: {
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        type: user.type,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// exports.loginRequired = function (req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     return res.status(401).json({ message: "Unauthorized user!!" });
//   }
// };

// exports.profile = function (req, res, next) {
//   if (req.user) {
//     res.send(req.user);
//     next();
//   } else {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
