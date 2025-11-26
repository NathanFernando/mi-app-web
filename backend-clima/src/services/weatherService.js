// src/services/weatherService.js
const axios = require('axios');
const WeatherCache = require('../models/WeatherCache');
const ForecastCache = require('../models/ForecastCache'); // <--- NUEVO
const SearchLog = require('../models/SearchLog');

// ... (Tu función getWeatherData que ya tenías sigue aquí igual) ...
const getWeatherData = async (city) => {
    // ... código existente ... (No cambies nada aquí)
    const citySanitized = city.trim().toLowerCase();
    const cachedData = await WeatherCache.findOne({ city_lower: citySanitized });
    if (cachedData) {
        await SearchLog.create({ city: city, status: 'success' }); // Log simple
        return cachedData.data;
    }
    // ... resto de tu lógica de llamada a API ...
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
    const response = await axios.get(url);
    const weatherData = response.data;
    await WeatherCache.create({ city_lower: citySanitized, data: weatherData });
    await SearchLog.create({ city: city, status: 'success', temp_result: weatherData.main.temp });
    return weatherData;
};

// 👇 NUEVA FUNCIÓN PARA EL PRONÓSTICO 👇
const getForecastData = async (city) => {
    const citySanitized = city.trim().toLowerCase();

    // 1. Buscar en Caché
    const cachedForecast = await ForecastCache.findOne({ city_lower: citySanitized });
    if (cachedForecast) {
        console.log(`⚡ Usando Pronóstico en caché para: ${city}`);
        return cachedForecast.data;
    }

    // 2. Consultar API
    console.log(`🌐 Consultando API Pronóstico para: ${city}`);
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

        const response = await axios.get(url);
        const forecastData = response.data;

        // 3. Guardar en Caché
        await ForecastCache.create({
            city_lower: citySanitized,
            data: forecastData
        });

        return forecastData;
    } catch (error) {
        throw error;
    }
};

module.exports = { getWeatherData, getForecastData }; // <--- Exportamos ambas