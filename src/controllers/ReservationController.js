const ReservationDao = require("../dao/ReservationDao");
const SeanceDao = require("../dao/SeanceDao");
const EmailSender = require('./EmailSender');

class ReservationController {
  async getAllReservations(req, res) {}

  async createReservation(req, res) {
    const { seance, sieges } = req.body;

    if (!seance || !sieges) {
      return res
        .status(400)
        .json({ message: "Seance ID and seat number are required" });
    }

    try {
      // console.log(`Updating seat ${sieges} in seance ${seance} to status false`);
      // const status = false;

      const unavailableSeats = [];

      for (const seatNumber of sieges) {
        try {
          await SeanceDao.updateEtatSiege(seance, seatNumber, false);
        } catch (error) {
          unavailableSeats.push(seatNumber);
        }
      }

      if (unavailableSeats.length > 0) {
        return res.status(400).json({
          message: `The following seats are reserved: ${unavailableSeats.join(
            ", "
          )}. Please choose different seats.`,
        });
      }

      const reservation = await ReservationDao.create({
        client: req.user._id,
        seance,
        sieges,
      });

      await EmailSender.sendConfirmationEmail(req.user.email, reservation);

      res.status(201).json(reservation);
    } catch (error) {
      console.error("Error reserving seat:", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getAvailableSeats(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Seance ID is required" });
    }

    try {
      const availableSeats = await ReservationDao.getAvailableSieges(id);

      if (!availableSeats) {
        return res.status(404).json({ message: 'No available seats found' });
      }
      
      res.status(200).json({ availableSeats });
    } catch (error) {
      console.error("Error fetching available seats:", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  
}

module.exports = new ReservationController();
