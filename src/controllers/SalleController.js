const SALLEdao = require('../dao/SALLEdao');

class SalleController {
    async getSalles(req, res) {
        try {
            const salles = await SALLEdao.findAll();
            res.status(200).json(salles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSalle(req, res) {
        try {
            const salle = await SALLEdao.findById(req.params.id);
            if (!salle) {
                return res.status(404).json({ message: 'Salle not found' });
            }
            res.status(200).json(salle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createSalle(req, res) {
        try {
            const newSalle = await SALLEdao.create(req.body);
            res.status(201).json(newSalle);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = new SalleController();