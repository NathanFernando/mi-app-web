const User = require('../models/User');
const bcrypt = require('bcryptjs');

// --- REGISTRAR USUARIO ---
const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan datos (usuario o contraseña).' });
    }

    try {
        // 1. Verificar si ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya existe.' });
        }

        // 2. Encriptar contraseña
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 

        // 3. Guardar en BD
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Usuario creado con éxito', userId: newUser._id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar usuario.' });
    }
};

// --- INICIAR SESIÓN ---
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Buscar usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado.' });
        }

        // 2. Comparar contraseña (la que escribieron vs la encriptada)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta.' });
        }

        
        res.status(200).json({
            message: 'Login exitoso',
            username: user.username,
            favorites: user.favorites
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};

module.exports = { register, login };