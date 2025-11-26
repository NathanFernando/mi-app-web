import React, { useState } from 'react';

function LoginModal({ style, onClose, onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const endpoint = isRegistering ? 'register' : 'login';
    const url = `http://192.168.1.49:4000/api/users/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || 'Ocurrió un error');
        return;
      }

      if (isRegistering) {
        alert('¡Usuario creado con éxito! Ahora inicia sesión.');
        setIsRegistering(false);
        setFormData({ username: '', password: '' });
      } else {
        if (onLoginSuccess) {
            onLoginSuccess(data);
        }
        setFormData({ username: '', password: '' });
      }

    } catch (error) {
      console.error("Error del servidor:", error);
      setErrorMsg('No se pudo conectar con el servidor.');
    }
  };

  // Volvemos a recibir el evento 'e' para prevenir la recarga
  const showRegister = (e) => {
    e.preventDefault(); // IMPORTANTE: Evita que el href="#" te suba al inicio de la página
    setIsRegistering(true);
    setErrorMsg('');
  };

  const showLogin = (e) => {
    e.preventDefault();
    setIsRegistering(false);
    setErrorMsg('');
  };

  return (
    <div id="login-modal" className="modal" style={style}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>

        {/* --- FORMULARIO DE LOGIN --- */}
        <form id="login-form" style={{ display: isRegistering ? 'none' : 'flex' }} onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          
          {errorMsg && <p style={{ color: 'red', fontSize: '0.9rem' }}>{errorMsg}</p>}

          <input 
            type="text" 
            name="username"
            id="username-input" 
            placeholder="Nombre de usuario" 
            value={formData.username}
            onChange={handleChange}
            required 
          />

          <div className="password-container">
            <input
              type={showLoginPassword ? "text" : "password"}
              name="password"
              id="password-input"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="material-symbols-outlined"
              onClick={() => setShowLoginPassword(!showLoginPassword)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              {showLoginPassword ? "visibility" : "visibility_off"}
            </span>
          </div>

          <button type="submit">Entrar</button>
          <p>
            ¿No tienes cuenta? 
            {/* AQUÍ ESTÁ EL TRUCO:
              Usamos eslint-disable para que React permita usar <a> como botón 
            */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="text-link" onClick={showRegister}>
              Crear una
            </a>
          </p>
        </form>

        {/* --- FORMULARIO DE REGISTRO --- */}
        <form id="register-form" style={{ display: isRegistering ? 'flex' : 'none' }} onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>

          {errorMsg && <p style={{ color: 'red', fontSize: '0.9rem' }}>{errorMsg}</p>}

          <input 
            type="text" 
            name="username"
            id="register-username" 
            placeholder="Nuevo usuario" 
            value={formData.username}
            onChange={handleChange}
            required 
          />

          <div className="password-container">
            <input
              type={showRegisterPassword ? "text" : "password"}
              name="password"
              id="register-password"
              placeholder="Nueva contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="material-symbols-outlined"
              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              {showRegisterPassword ? "visibility" : "visibility_off"}
            </span>
          </div>

          <button type="submit">Registrar</button>
          <p>
            ¿Ya tienes cuenta? 
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="text-link" onClick={showLogin}>
              Iniciar sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;