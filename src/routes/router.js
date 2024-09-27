const express = require('express');
const AuthRouter = require('./AuthRouter');
const SalleRouter = require('./SalleRouter');
const FilmRouter = require('./FilmRouter');
const AdminRouter = require('./AdminRouter');
const UserRouter = require('./UsersRouter');
const SeanceRouter = require('./SeanceRouter');
const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('Welcome to CinéManager!');
});


router.use('/api/auth', AuthRouter);
router.use('/api/admin', AdminRouter);
// router.use('/api/users', UserRouter);
router.use('/api/films', FilmRouter);
router.use('/api/salles', SalleRouter);
router.use('/api/seances', SeanceRouter);

module.exports = router;
