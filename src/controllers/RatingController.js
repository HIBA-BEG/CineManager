const RatingDao = require('../dao/RatingDao');

class RatingController {
  async getAllRatings(req, res) {
    try {
      const ratings = await RatingDao.findAll();
      res.status(200).json(ratings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getRating(req, res) {
    try {
      const rating = await RatingDao.findById(req.params.id);
      if (!rating) {
        return res.status(404).json({ message: 'Rating not found' });
      }
      res.status(200).json(rating);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createRating(req, res) {
    try {
      const newRating = await RatingDao.create(req.body);
      res.status(201).json(newRating);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateRating(req, res) {
    try {
      const updatedRating = await RatingDao.updateById(req.params.id, req.body);
      if (!updatedRating) {
        return res.status(404).json({ message: 'Rating not found' });
      }
      res.status(200).json(updatedRating);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteRating(req, res) {
    try {
      const deletedRating = await RatingDao.deleteById(req.params.id);
      if (!deletedRating) {
        return res.status(404).json({ message: 'Rating not found' });
      }
      res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getRatingsByFilm(req, res) {
    try {
      const ratings = await RatingDao.findByFilm(req.params.filmId);
      res.status(200).json(ratings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getRatingsByUser(req, res) {
    try {
      const ratings = await RatingDao.findByUser(req.params.userId);
      res.status(200).json(ratings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAverageRatingForFilm(req, res) {
    try {
      const averageRating = await RatingDao.getAverageRatingForFilm(req.params.filmId);
      res.status(200).json({ averageRating });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RatingController();