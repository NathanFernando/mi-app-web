require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

// Importar Rutas
const weatherRoutes = require('./src/routes/weatherRoutes');
const userRoutes = require('./src/routes/userRoutes'); 
const app = express();

// --- MIDDLEWARES  ---

// 3. CORS debe ir PRIMERO que todo
// le dice al navegador: "Deja pasar a cualquiera, no bloquees"
app.use(cors());

// 4. JSON debe ir SEGUNDO
// permite que el servidor entienda los datos que envía el LoginModal
app.use(express.json());

// Log para ver si llegan las peticiones (Opcional pero útil)
app.use((req, res, next) => {
    console.log(`🔔 Petición recibida: ${req.method} ${req.url}`);
    next();
});

// --- CONEXIÓN MONGO ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// --- RUTAS ---
app.use('/api', weatherRoutes);
app.use('/api/users', userRoutes); 

// Iniciar
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});