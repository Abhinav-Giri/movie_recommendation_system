const recommendationService = require('../services/recommendationService');

exports.getRecommendation = async (req, res, next) => {
    try {
        const { genre, duration, mood } = req.body;
        
        if (!genre || !duration || !mood) {
            return res.status(400).json({
                error: 'Missing required parameters'
            });
        }

        const recommendation = await recommendationService.findRecommendation(
            genre,
            duration,
            mood
        );

        res.json({ recommendation });
    } catch (error) {
        next(error);
    }
};