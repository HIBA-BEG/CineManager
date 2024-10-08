const jwt = require("jsonwebtoken");
const UserDao = require('../dao/UserDao');

class UserController {
    async register(req, res) {
        try {
            const newUser = await UserDao.create(req.body);
            newUser.hash_password = undefined;
            return res.status(201).json(newUser);
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    }

    login(req, res) {
        try {
            UserDao.findByEmail(req.body.email).then( (user) => {
                
           
                
                if (!user || !user.comparePassword(req.body.password)) {
                    return res
                        .status(401)
                        .json({ message: "Authentication failed. Invalid user or password." });
                }
    
                const token = jwt.sign(
                    { email: user.email, nom: user.nom, prenom: user.prenom, _id: user._id },
                    process.env.JWT_SECRET || "RESTFULAPIs",
                    { expiresIn: "1h" }
                );

                
                return res.json({
                    token,
                    user: {
                        email: user.email,
                        nom: user.nom,
                        prenom: user.prenom,
                        type: user.type,
                    },
                });
                
            }
            )


        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await UserDao.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const user = await UserDao.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const updatedUser = await UserDao.updateById(req.params.id, req.body);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await UserDao.deleteById(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
