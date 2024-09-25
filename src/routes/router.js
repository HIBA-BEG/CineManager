const express = require('express');
const AuthRouter = require('./AuthRouter');
const SalleRouter = require('./SalleRouter');
const FilmRouter = require('./FilmRouter');
const AdminRouter = require('./AdminRouter');
const UserRouter = require('./UsersRouter');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Welcome to CinéManager!');
});


router.use('/api/auth', AuthRouter);
// router.use('/api/admin', AdminRouter);
// router.use('/api/users', UserRouter);
router.use('/api/films', FilmRouter)

module.exports = router;
