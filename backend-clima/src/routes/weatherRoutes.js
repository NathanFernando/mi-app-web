// src/routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Definimos la ruta GET /weather
router.get('/weather', weatherController.getWeather);
router.get('/weather', weatherController.getWeather);
router.get('/forecast', weatherController.getForecast); // <--- NUEVA RUTA

module.exports = router;
module.exports = router;