const router = require('express').Router();
const userRoutes = require('./Users');

router.use('/user', userRoutes);


module.exports = router;