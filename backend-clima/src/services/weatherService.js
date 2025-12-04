const axios = require('axios');
const WeatherCache = require('../models/WeatherCache');
const ForecastCache = require('../models/ForecastCache');
const SearchLog = require('../models/SearchLog');

//RECIBE (city, username)
const getWeatherData = async (city, username) => {
    const citySanitized = city.trim().toLowerCase();

    // Si username viene vacío o undefined, usamos 'Invitado'
    const userLog = username || 'Invitado';

    // 1. Consultar primero el CACHÉ
    const cachedData = await WeatherCache.findOne({ city_lower: citySanitized });

    if (cachedData) {
        console.log(` Usando datos en caché para: ${city}`);

        // Guardamos log con usuario
        try {
            await SearchLog.create({ city: city, username: userLog, status: 'success' });
        } catch (err) { console.error("Error guardando log:", err.message); }

        return cachedData.data;
    }

    // 2. Si no hay caché, consultar OpenWeather
    console.log(` Consultando API externa para: ${city}`);
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

        const response = await axios.get(url);
        const weatherData = response.data;

        // Guardar en CACHÉ
        await WeatherCache.create({
            city_lower: citySanitized,
            data: weatherData
        });

        // Guardar en HISTORIAL con usuario y temperatura
        await SearchLog.create({
            city: city,
            username: userLog,
            status: 'success',
            temp_result: weatherData.main.temp
        });

        return weatherData;

    } catch (error) {
        // Registrar error en historial con usuario
        await SearchLog.create({ city: city, username: userLog, status: 'failed' });
        throw error;
    }
};

// --- Lógica del Pronóstico  ---
const getForecastData = async (city) => {
    const citySanitized = city.trim().toLowerCase();

    const cachedForecast = await ForecastCache.findOne({ city_lower: citySanitized });
    if (cachedForecast) {
        console.log(` Usando Pronóstico en caché para: ${city}`);
        return cachedForecast.data;
    }

    console.log(` Consultando API Pronóstico para: ${city}`);
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

        const response = await axios.get(url);
        const forecastData = response.data;

        await ForecastCache.create({
            city_lower: citySanitized,
            data: forecastData
        });

        return forecastData;
    } catch (error) {
        throw error;
    }
};

module.exports = { getWeatherData, getForecastData };