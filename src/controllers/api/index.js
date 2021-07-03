const router = require('express').Router();
const userRoutes = require('./Users');
const thoughtRoutes = require('./Thoughts');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);


module.exports = router;