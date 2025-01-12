document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recommendationForm');
    const recommendationDiv = document.getElementById('recommendation');
    const errorDiv = document.getElementById('error');

    const API_URL = process.env.API_URL || 'http://localhost:3000/api';

    const showError = (message) => {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        errorDiv.classList.add('visible');
        recommendationDiv.classList.add('hidden');
    };

    const showRecommendation = (recommendation) => {
        recommendationDiv.textContent = recommendation;
        recommendationDiv.classList.remove('hidden');
        recommendationDiv.classList.add('visible');
        errorDiv.classList.add('hidden');
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const preferences = {
            genre: formData.get('genre'),
            duration: formData.get('duration'),
            mood: formData.get('mood')
        };

        try {
            const response = await fetch(`${API_URL}/recommendations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preferences)
            });

            if (!response.ok) {
                throw new Error('Failed to get recommendation');
            }

            const data = await response.json();
            showRecommendation(data.recommendation);
        } catch (error) {
            showError('Sorry, something went wrong. Please try again later.');
            console.error('Error:', error);
        }
    });
});