const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register );

router.post("/login", login);

router.post("/current", (req,res) => {
    res.json({ message : "current user information"});
});

module.exports = router;