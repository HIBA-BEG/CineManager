const { reservationModel, seanceModel } = require("../models/ModelsExports");

// const nodemailer = require("nodemailer");

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
  

}

module.exports = new ReservationDao();
