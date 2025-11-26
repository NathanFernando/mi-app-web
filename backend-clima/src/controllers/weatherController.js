// src/controllers/weatherController.js
const weatherService = require('../services/weatherService');

// --- 1. CONTROLADOR DE CLIMA ACTUAL ---
const getWeather = async (req, res) => {
    const { city } = req.query; // Esperamos ?city=Londres en la URL

    if (!city) {
        return res.status(400).json({ error: 'Debe proporcionar el nombre de una ciudad.' });
    }

    try {
        const data = await weatherService.getWeatherData(city);
        res.status(200).json(data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Ciudad no encontrada.' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}; // <--- ¡AQUÍ FALTABA CERRAR LA PRIMERA FUNCIÓN!

// --- 2. CONTROLADOR DE PRONÓSTICO ---
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

// Exportamos ambas funciones
module.exports = { getWeather, getForecast };