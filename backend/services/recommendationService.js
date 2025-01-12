const { pool } = require('../db/config');

exports.findRecommendation = async (genre, duration, mood) => {
    const durationRanges = {
        short: 'duration < 90',
        medium: 'duration >= 90 AND duration <= 120',
        long: 'duration > 120'
    };

    const query = `
        SELECT * FROM movies
        WHERE genre = $1
        AND ${durationRanges[duration]}
        AND mood = $2
        ORDER BY RANDOM()
        LIMIT 1;
    `;

    const result = await pool.query(query, [genre, mood]);
    
    if (result.rows.length === 0) {
        throw new Error('No matching movies found');
    }

    const movie = result.rows[0];
    return (`Based on your preferences, we recommend watching ${movie.title} — ${movie.description} (${movie.duration} minutes`);
};