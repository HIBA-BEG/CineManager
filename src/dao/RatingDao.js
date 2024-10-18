const { ratingModel } = require('../models/ModelsExports');

class RatingDao {
  async findAll() {
    try {
      return await ratingModel.find().populate('user film');
    } catch (error) {
      throw new Error('Error fetching Ratings');
    }
  }

  async findById(id) {
    try {
      return await ratingModel.findById(id).populate('user film');
    } catch (error) {
      throw new Error('Error finding Rating');
    }
  }

  async create(ratingData) {
    try {
      const newRating = new ratingModel(ratingData);
      return await newRating.save();
    } catch (error) {
      throw new Error('Error creating Rating');
    }
  }

  async updateById(id, updateData) {
    try {
      return await ratingModel.findByIdAndUpdate(id, updateData, { new: true }).populate('user film');
    } catch (error) {
      throw new Error('Error updating Rating');
    }
  }

  async deleteById(id) {
    try {
      return await ratingModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting Rating');
    }
  }

  async findByFilm(filmId) {
    try {
      return await ratingModel.find({ film: filmId }).populate('user');
    } catch (error) {
      throw new Error('Error fetching Ratings by film');
    }
  }

  async findByUser(userId) {
    try {
      return await ratingModel.find({ user: userId }).populate('film');
    } catch (error) {
      throw new Error('Error fetching Ratings by user');
    }
  }

  async getAverageRatingForFilm(filmId) {
    try {
      const result = await ratingModel.aggregate([
        { $match: { film: filmId } },
        { $group: { _id: null, averageRating: { $avg: "$score" } } }
      ]);
      return result.length > 0 ? result[0].averageRating : 0;
    } catch (error) {
      throw new Error('Error calculating average rating for film');
    }
  }
}

module.exports = new RatingDao();