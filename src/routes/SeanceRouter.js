const express = require('express');
const SeanceController = require('../controllers/SeanceController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.use(isAdmin);
router.post('/AddSeance', SeanceController.createSeance);
router.get("/AllSeances", SeanceController.getAllSeances);
router.get("/One/:id", SeanceController.getSeanceById);
// router.put('/UpdateSeance/:id', SeanceController.updateSeance);
router.delete('/DeleteSeance/:id', SeanceController.deleteSeance);


module.exports = router;