const FilmDao = require("../dao/FilmDao");
const path = require("path");

class FilmController {
  async getAllFilms(req, res) {
    try {
      const films = await FilmDao.findAll();

      const filmsWithImages = films.map((film) => ({
        ...film._doc,
        affiche:
          typeof film.affiche === "string"
            ? `${req.protocol}://${req.get("host")}${film.affiche}`
            : null,
      }));

      res.status(200).json(filmsWithImages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getFilm(req, res) {
    try {
      const film = await FilmDao.findById(req.params.id);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }

      const filmWithImage = {
        ...film._doc,
        affiche:
          typeof film.affiche === "string"
            ? `${req.protocol}://${req.get("host")}${film.affiche}`
            : null,
      };

      res.status(200).json(filmWithImage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createFilm(req, res) {
    try {
      //   console.log("Request body:", req.body);
      //   console.log("Uploaded file:", req.file);

      const { titre, genre, duree, description } = req.body;

      const affiche = req.file ? `/uploads/${req.file.filename}` : null;

      if (!titre || !genre || !duree) {
        return res
          .status(400)
          .json({ message: "All required fields must be provided" });
      }

      const newFilmData = {
        titre,
        genre,
        duree,
        description,
        affiche,
      };

      const newFilm = await FilmDao.create(newFilmData);
      res.status(201).json(newFilm);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateFilm(req, res) {
    try {
      const updatedFilm = await FilmDao.updateById(req.params.id, req.body);
      if (!updatedFilm) {
        return res.status(404).json({ message: "Film not found" });
      }
      res.status(200).json(updatedFilm);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteFilm(req, res) {
    try {
      const deletedFilm = await FilmDao.deleteById(req.params.id);
      if (!deletedFilm) {
        return res.status(404).json({ message: "Film not found" });
      }
      res.status(200).json({ message: "Film deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new FilmController();
