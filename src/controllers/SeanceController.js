const SeanceDao = require("../dao/SeanceDao");
const SalleDao = require("../dao/SalleDao");

class SeanceController {
  async createSeance(req, res) {
    const { film, salle, date, heure_debut, heure_fin, tarif } = req.body;
    // const userId = req.user.id;

    try {
      const salleDispo = await SalleDao.findById(salle);

      if (!salleDispo) {
        return res.status(404).json({ message: 'Salle not found' });
      }

      const placesDispo = salleDispo.sieges.filter((siege) => siege.etat === true).length;

    //   console.log(placesDispo);
      if (placesDispo === 0) {
        return res.status(400).json({ message: 'No available seats in the room' });
      }

      const newSeance = await SeanceDao.create({
        film,
        salle,
        date,
        heure_debut,
        heure_fin,
        tarif,
        placesDisponibles: placesDispo,
        user: req.user.id,
      });

      await SeanceDao.updateEtatSiege(newSeance._id);

      res.status(201).json(newSeance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllSeances(req, res) {
    try {
      const seances = await SeanceDao.findAll();
      // console.log(seances);

      const seancesWithImages = seances.map((seance) => ({
        ...seance._doc,
        film: seance.film ? { ...seance.film,
              affiche:
                typeof seance.film.affiche === "string"
                  ? `${req.protocol}://${req.get("host")}${seance.film.affiche}`
                  : null,
            }
          : null,
      }));

      res.status(200).json(seancesWithImages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getSeanceById(req, res) {
    // const { id } = req.params;
    try {
      const seance = await SeanceDao.findById(req.params.id);

      if (!seance) {
        return res.status(404).json({ message: 'Seance not found' });
      }

      const seanceWithImage = {
        ...seance._doc,
        film: seance.film
          ? {
              ...seance.film._doc,
              affiche:
                typeof seance.film.affiche === "string"
                  ? `${req.protocol}://${req.get("host")}${seance.film.affiche}`
                  : null,
            }
          : null,
      };

      res.status(200).json(seanceWithImage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
 
  async deleteSeance(req, res) {
    try {
      const deletedSeance = await SeanceDao.deleteById(req.params.id);
      if (!deletedSeance) {
        return res.status(404).json({ message: "Seance not found" });
      }
      res.status(200).json({ message: "Seance deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new SeanceController();