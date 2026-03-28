import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeather = async (latitude, longitude) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                latitude,
                longitude,
                current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
                timezone: 'auto'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Start Geocoding (Convert city to lat/long) - mocked for simplicity or use another free API
// For now, let's default to a fixed location or browser location
export const getCoordinates = async (city) => {
    // In a real app, use OpenWeather Geocoding or similar.
    // For demo, we might rely on browser geolocation or manual lat/long
    try {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        if (response.data.results && response.data.results.length > 0) {
            return response.data.results[0];
        }
        throw new Error('City not found');
    } catch (error) {
        throw error;
    }
};
