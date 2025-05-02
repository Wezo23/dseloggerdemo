const express = require('express');
const router = express.Router();
const { pushData } = require('../controllers/dataController');

router.post('/data/push', pushData);

module.exports = router;