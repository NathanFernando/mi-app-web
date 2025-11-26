// backend-clima/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// IMPORTAR RUTAS 1. 👇
const weatherRoutes = require('./src/routes/weatherRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// USAR RUTAS 2. 👇
// Esto significa que todas las rutas de clima empezarán con /api
app.use('/api', weatherRoutes);

app.get('/', (req, res) => {
    res.send('API del Clima funcionando 🚀');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});