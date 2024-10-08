const { reservationModel, seanceModel } = require("../models/ModelsExports");

const nodemailer = require("nodemailer");

class ReservationDao {
  async create(reservationData) {
    try {
      const reservation = new reservationModel(reservationData);
      return await reservation.save();
    } catch (error) {
      throw new Error("Error creating reservation: " + error.message);
    }
  }
  async getAllReservations() {
    try {
      return reservationModel
        .find({ archived_reservation: false })
        .populate("client")
        .populate("seance");
    } catch (error) {
      throw new Error("Error fetching reservations: " + error.message);
    }
  }

  async getAvailableSieges(id) {
    try {
      const seance = await seanceModel.findById(id)
        .populate("salle")
        .select("sieges");

      // console.log(seance.salle.sieges);

      if (!seance) {
        console.error("Seance not found with ID:", id);
        throw new Error("Seance not found");
      }

      if (!seance.salle.sieges || !Array.isArray(seance.salle.sieges)) {
        throw new Error("Sieges field is missing or not an array");
      }

      const availableSieges = seance.salle.sieges.filter(
        (siege) => siege.etat === true
      );

      return availableSieges;
    } catch (error) {
      throw new Error("Error fetching available seats: " + error.message);
    }
  }
}

module.exports = new ReservationDao();
