const express = require("express");
const UserController = require("../controllers/UserController");
const AdminController = require('../controllers/AdminController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.use(isAdmin);

router.get("/users", UserController.getUsers);


module.exports = router;