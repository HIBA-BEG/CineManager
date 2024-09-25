const { filmModel } = require('../models/ModelsExports');

class FILMdao {
    async findAll() {
        try {
            return await filmModel.find({ archived_film: false });
        } catch (error) {
            throw new Error('Error fetching Films');
        }
    }

    async findById(id) {
        try {
            return await filmModel.findById(id);
        } catch (error) {
            throw new Error('Error finding Film');
        }
    }


    async create(FilmData) {
        try {
            const newFilm = new filmModel(FilmData);
            return await newFilm.save();
        } catch (error) {
            throw new Error('Error creating Film');
        }
    }

    async updateById(id, updateData) {
        try {
            return await filmModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error('Error updating Film');
        }
    }

    async deleteById(id) {
        try {
            return await filmModel.findByIdAndUpdate(id, { archived_film: true }, { new: true });
        } catch (error) {
            throw new Error('Error deleting Film');
        }
    }
}

module.exports = new FILMdao();