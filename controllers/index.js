// Initialize imports
const router = require('express').Router();

// Set paths
const apiRoutes = require('./api');
const homeRoutes = require('./homePaths.js');

// Use paths
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;