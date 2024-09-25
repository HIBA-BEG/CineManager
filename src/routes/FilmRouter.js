const express = require("express");
const FilmController = require("../controllers/FilmController");
const router = express.Router();
// const { verifyAdmin } = require('../middleware/authMiddleware');

router.get('/AllFilms', FilmController.getAllFilms);
// router.get('/films', FilmController.getAllFilms);
router.get('/One/:id', FilmController.getFilm);
router.post('/AddFilm', FilmController.createFilm);
router.put('/UpdateFilm/:id',FilmController.updateFilm);
router.delete('/DeleteFilm/:id',FilmController.deleteFilm);
// router.post('/AddFilm', verifyAdmin, FilmController.createFilm);
// router.put('/UpdateFilm/:id',verifyAdmin, FilmController.updateFilm);
// router.delete('/DeleteFilm/:id',verifyAdmin, FilmController.deleteFilm);

module.exports = router;