const express = require('express');
const AuthRouter = require('./AuthRouter');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Welcome to CinéManager!');
});


router.use('/api/Auth', AuthRouter);

module.exports = router;
