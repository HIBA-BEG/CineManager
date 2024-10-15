const minioClient = require("../../minio");
const FilmDao = require("../dao/FilmDao");
const path = require("path");
const fs = require("fs");

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

  async uploadToMinioFilm(file) {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);
      const fileName = Date.now() + "-" + file.originalname;

      minioClient.putObject(
        "film",
        fileName,
        fileStream,
        (err, etag) => {
          if (err) {
            return reject(err);
          }
          resolve(
            `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_FILM}/${fileName}`
          );
        }
      );
    });
  }
  async uploadToMinioAffiche(file) {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);
      const fileName = Date.now() + "-" + file.originalname;

      minioClient.putObject(
        "affiche",
        fileName,
        fileStream,
        (err, etag) => {
          if (err) {
            return reject(err);
          }
          resolve(
            `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_AFFICHE}/${fileName}`
          );
        }
      );
    });
  }

  async createFilm(req, res) {
    try {
      const { titre, genre, duree, description, dateSortie, producer, status, releaseStreamDate } = req.body;
      let afficheUrl = null;
      let videoUrl = null;

      // Check and upload 'affiche' if exists
      if (req.files && req.files.affiche && req.files.affiche.length > 0) {
        afficheUrl = await uploadToMinioAffiche(req.files.affiche[0]);
      }

      // Check and upload 'video' if exists
      if (req.files && req.files.video && req.files.video.length > 0) {
        videoUrl = await uploadToMinioFilm(req.files.video[0]);
      }

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
        dateSortie, 
        producer, 
        status, 
        releaseStreamDate,
        affiche: afficheUrl,
        video: videoUrl, // Store video URL
      };

      const newFilm = await FilmDao.create(newFilmData);
      res.status(201).json(newFilm);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  // async createFilm(req, res) {
  //   try {
  //     //   console.log("Request body:", req.body);
  //     //   console.log("Uploaded file:", req.file);

  //     const { titre, genre, duree, description } = req.body;

  //     const affiche = req.file ? `/uploads/${req.file.filename}` : null;

  //     if (!titre || !genre || !duree) {
  //       return res
  //         .status(400)
  //         .json({ message: "All required fields must be provided" });
  //     }

  //     const newFilmData = {
  //       titre,
  //       genre,
  //       duree,
  //       description,
  //       affiche,
  //     };

  //     const newFilm = await FilmDao.create(newFilmData);
  //     res.status(201).json(newFilm);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

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

  async getFilmsByGenre(req, res) {
    try {
      const films = await FilmDao.findByGenre(req.params.genreId);
      res.status(200).json(films);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async searchFilms(req, res) {
    try {
      const films = await FilmDao.searchByTitle(req.query.title);
      res.status(200).json(films);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getLatestFilms(req, res) {
    try {
      const films = await FilmDao.getLatestFilms(req.query.limit);
      res.status(200).json(films);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateStreamingStatus(req, res) {
    try {
      const updatedFilm = await FilmDao.updateStreamingStatus(
        req.params.id,
        req.body.isStreamed,
        req.body.releaseStreamDate
      );
      if (!updatedFilm) {
        return res.status(404).json({ message: "Film not found" });
      }
      res.status(200).json(updatedFilm);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getRelatedFilms(req, res) {
    try {
      const relatedFilms = await FilmDao.getRelatedFilms(
        req.params.id,
        req.query.limit
      );
      res.status(200).json(relatedFilms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new FilmController();
