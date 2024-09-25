const { userModel } = require('../models/ModelsExports');
const bcrypt = require('bcrypt');

class USERdao {
    async findAll() {
        try {
            return await userModel.find();
        } catch (error) {
            throw new Error('Error fetching Users');
        }
    }

    async findById(id) {
        try {
            return await userModel.findById(id);
        } catch (error) {
            throw new Error('Error finding User');
        }
    }

    async findByEmail(email) {
        try {
            return await userModel.findOne({ email });
        } catch (error) {
            throw new Error('Error finding User by email');
        }
    }

    async create(userData) {
        try {
            const newUser = new userModel(userData);
            newUser.hash_password = bcrypt.hashSync(userData.password, 10);
            return await newUser.save();
        } catch (error) {
            throw new Error('Error creating User');
        }
    }

    async updateById(id, updateData) {
        try {
            if (updateData.password) {
                updateData.hash_password = bcrypt.hashSync(updateData.password, 10);
                delete updateData.password;
            }
            return await userModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error('Error updating User');
        }
    }

    async deleteById(id) {
        try {
            return await userModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting User');
        }
    }
}

module.exports = new USERdao();