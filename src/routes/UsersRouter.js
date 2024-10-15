const express = require("express");
const UserController = require("../controllers/UserController");
const AdminController = require('../controllers/AdminController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
// router.use(isAdmin);

router.get("/users", UserController.getUsers);
// router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id/profile', UserController.updateProfile);
router.put('/:id/subscription', UserController.updateSubscription);


module.exports = router;