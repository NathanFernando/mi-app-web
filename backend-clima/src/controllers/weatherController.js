const weatherService = require('../services/weatherService');

const getWeather = async (req, res) => {
    // Leemos 'city' y 'username' de la URL
    const { city, username } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'Debe proporcionar el nombre de una ciudad.' });
    }

    try {
        // Pasamos ambos datos al servicio
        const data = await weatherService.getWeatherData(city, username);
        res.status(200).json(data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Ciudad no encontrada.' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const getForecast = async (req, res) => {
    const { city } = req.query;

    if (!city) return res.status(400).json({ error: 'Falta la ciudad.' });

    try {
        const data = await weatherService.getForecastData(city);
        res.status(200).json(data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Ciudad no encontrada.' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error interno.' });
    }
};

module.exports = { getWeather, getForecast };