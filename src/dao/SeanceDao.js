const { seanceModel } = require("../models/ModelsExports");

class SeanceDao {
  async create(seanceData) {
    try {
      const newSeance = new seanceModel(seanceData);
      return await newSeance.save();
    } catch (error) {
      throw new Error("Error creating Seance");
    }
  }

  async findAll() {
    try {
      return (
        seanceModel
          .find({ archived_seance: false })
          .populate("user")
          .populate("film")
          // .populate("salle");
          .populate({
            path: "salle",
            populate: { path: "sieges" },
          })
      );
    } catch (error) {
      throw new Error("Error fetching toutes les Seance");
    }
  }

  async findById(id) {
    try {
      return seanceModel
        .findById(id)
        .populate("user")
        .populate("film")
        .populate("salle");
    } catch (error) {
      throw new Error("Error fetching une Seance");
    }
  }

  async deleteById(id) {
    try {
      return await seanceModel.findByIdAndUpdate(
        id,
        { archived_seance: true },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error deleting Seance");
    }
  }

  async updateEtatSiege(seanceId, seatNumber, status) {
    try {
      const seance = await seanceModel.findById(seanceId).populate("salle");

      if (!seance || !seance.salle) {
        throw new Error(`Seance or Salle not found for ID ${seanceId}`);
      }

      const seat = seance.salle.sieges.find(
        (siege) => siege.numero === seatNumber
      );

      if (!seat) {
        throw new Error(`Seat number ${seatNumber} not found in salle`);
      }

      if (!seat.etat) {
        throw new Error(
          `Seat number ${seatNumber} is already reserved. Please choose another seat.`
        );
      }

      seat.etat = status;

      await seance.salle.save();

      const updatedPlacesDisponibles = seance.salle.sieges.filter((siege) => siege.etat === true).length;

      seance.placesDisponibles = updatedPlacesDisponibles;
      await seance.save();

      return seance;
    } catch (error) {
      console.error("Error updating seat status:", error.message);
      throw new Error(`Error updating seat status: ${error.message}`);
    }
  }
}

module.exports = new SeanceDao();
