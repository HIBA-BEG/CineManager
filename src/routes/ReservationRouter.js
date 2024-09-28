const express = require("express");
const ReservationController = require("../controllers/ReservationController");
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/AddReservation', ReservationController.createReservation);
// router.get('/AllReservationss', ReservationController.getAllReservations);
// router.get('/One/:id', ReservationController.);


// router.put('/UpdateReservation/:id',ReservationController.);
// router.delete('/AnnulerReservation/:id',ReservationController.);

module.exports = router;