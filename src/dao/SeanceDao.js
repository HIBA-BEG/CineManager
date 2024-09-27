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
      return seanceModel
        .find({ archived_seance: false })
        .populate("user")
        .populate("film")
        .populate("salle");
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
}

module.exports = new SeanceDao();
