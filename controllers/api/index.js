// Initialize imports
const router = require('express').Router();

// Set paths
const userRoutes = require('./userPaths.js');
const postRoutes = require('./postPaths.js');
const commentRoutes = require('./commentPaths.js');

// Use paths
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;