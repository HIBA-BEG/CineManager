const FILMdao = require('../dao/FILMdao');

class FilmController {
    async getAllFilms(req, res) {
        try {
            const films = await FILMdao.findAll();
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getFilm(req, res) {
        try {
            const film = await FILMdao.findById(req.params.id);
            if (!film) {
                return res.status(404).json({ message: 'Film not found' });
            }
            res.status(200).json(film);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createFilm(req, res) {
        try {
            const newFilm = await FILMdao.create(req.body);
            res.status(201).json(newFilm);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateFilm(req, res) {
        try {
            const updatedFilm = await FILMdao.updateById(req.params.id, req.body);
            if (!updatedFilm) {
                return res.status(404).json({ message: 'Film not found' });
            }
            res.status(200).json(updatedFilm);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteFilm(req, res) {
        try {
            const deletedFilm = await FILMdao.deleteById(req.params.id);
            if (!deletedFilm) {
                return res.status(404).json({ message: 'Film not found' });
            }
            res.status(200).json({ message: 'Film deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new FilmController();