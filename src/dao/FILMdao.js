const { filmModel } = require('../models/ModelsExports');

class FILMdao {
    async findAll() {
        try {
            return await filmModel.find({ archived_film: false });
        } catch (error) {
            throw new Error('Error fetching Films' + error.message);
        }
    }

    async findById(id) {
        try {
            return await filmModel.findById(id);
        } catch (error) {
            throw new Error('Error finding Film' + error.message);
        }
    }


    async create(FilmData) {
        try {
            const newFilm = new filmModel(FilmData);
            return await newFilm.save();
        } catch (error) {
            throw new Error('Error creating Film' + error.message);
        }
    }

    async updateById(id, updateData) {
        try {
            return await filmModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error('Error updating Film' + error.message);
        }
    }

    async deleteById(id) {
        try {
            return await filmModel.findByIdAndUpdate(id, { archived_film: true }, { new: true });
        } catch (error) {
            throw new Error('Error deleting Film' + error.message);
        }
    }
}

module.exports = new FILMdao();