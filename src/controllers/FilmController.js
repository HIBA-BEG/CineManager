const minioClient = require("../../minio");
const FilmDao = require("../dao/FilmDao");
const path = require("path");
const fs = require("fs");

class FilmController {
  async getAllFilms(req, res) {
    try {
      const films = await FilmDao.findAll();

      res.status(200).json(films);
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
      res.status(200).json(film);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createFilm(req, res) {
    console.log('Received request body:', req.body);
    try {
      const { titre, genre, duree, description, dateSortie, producer, status, releaseStreamDate } = req.body;
      let afficheUrl = null;
      let videoUrl = null;
      // console.log(req.body)

      if (req.files && req.files.affiche && req.files.affiche.length > 0) {
        const afficheFile = req.files.affiche[0];
        afficheUrl = await FilmDao.uploadToMinioAffiche(afficheFile);
      }

      if (req.files && req.files.video && req.files.video.length > 0) {
        const videoFile = req.files.video[0];
        videoUrl = await FilmDao.uploadToMinioFilm(videoFile);
      }

      // if (!titre || !duree) {
      //   return res
      //     .status(400)
      //     .json({ message: "All required fields must be provided" });
      // }
      let genreIds = [];

      genreIds = genre.replace(/[\[\]'\"]/g, '').split(',').map(id => id.trim());
      
      const newFilmData = {
        titre,
        genre: genreIds,
        duree,
        description,
        dateSortie, 
        producer, 
        status, 
        releaseStreamDate,
        affiche: afficheUrl,
        video: videoUrl,
      };
      console.log(newFilmData)
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

  async getFilmsByGenre(req, res) {
    try {
      const films = await FilmDao.findByGenre(req.params.genreId);
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
