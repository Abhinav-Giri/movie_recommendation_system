const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.post('/recommendations', recommendationController.getRecommendation);

module.exports = router;