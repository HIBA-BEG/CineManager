const express = require('express');
const SalleController = require('../controllers/SalleController');
const router = express.Router();

router.get('/AllSalles', SalleController.getSalles);
router.get('/One/:id', SalleController.getSalle);
router.post('/AddSalle', SalleController.createSalle);


module.exports = router;