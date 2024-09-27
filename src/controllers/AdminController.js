const AdminDao = require('../dao/AdminDao');
const bcrypt = require('bcrypt');

class AdminController {
  async getAllAdmins(req, res) {
    try {
      const admins = await AdminDao.findAllAdmins();
      res.status(200).json(admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getAdmin(req, res) {
    try {
      const admin = await AdminDao.findAdminById(req.params.id);
      if (!admin || admin.type !== 'Administrateur') {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createAdmin(req, res) {
    try {
      const adminData = {
        ...req.body,
        type: 'Administrateur',
        hash_password: bcrypt.hashSync(req.body.password, 10)
      };
      delete adminData.password;
      
      const newAdmin = await AdminDao.createAdmin(adminData);
      res.status(201).json(newAdmin);
    } catch (error) {
      console.error('Error in Administrateur creation:', error);
      if (error.message.includes('duplicate key error')) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async updateAdmin(req, res) {
    try {
      if (req.body.password) {
        req.body.hash_password = bcrypt.hashSync(req.body.password, 10);
        delete req.body.password;
      }
      const updatedAdmin = await AdminDao.updateAdminById(req.params.id, req.body);
      if (!updatedAdmin || updatedAdmin.type !== 'Administrateur') {
        return res.status(404).json({ message: 'Administrateur not found' });
      }
      res.status(200).json(updatedAdmin);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteAdmin(req, res) {
    try {
      const deletedAdmin = await AdminDao.deleteAdminById(req.params.id);
      if (!deletedAdmin || deletedAdmin.type !== 'Administrateur') {
        return res.status(404).json({ message: 'Administrateur not found' });
      }
      res.status(200).json({ message: 'Administrateur deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AdminController();