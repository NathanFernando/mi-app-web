import React, { useState } from 'react';

function LoginModal({ style, onClose }) {
  // Estado para cambiar entre Login y Registro
  const [isRegistering, setIsRegistering] = useState(false);

  // --- NUEVO: Estados para la visibilidad de las contraseñas ---
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Funciones para alternar vistas
  const showRegister = (e) => {
    e.preventDefault();
    setIsRegistering(true);
  };

  const showLogin = (e) => {
    e.preventDefault();
    setIsRegistering(false);
  };

  return (
    <div id="login-modal" className="modal" style={style}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>

        {/* --- FORMULARIO DE LOGIN --- */}
        <form id="login-form" style={{ display: isRegistering ? 'none' : 'flex' }}>
          <h2>Iniciar Sesión</h2>
          <input type="text" id="username-input" placeholder="Nombre de usuario" required />

          <div className="password-container">
            {/*Si showLoginPassword es true, es 'text', si no 'password' */}
            <input
              type={showLoginPassword ? "text" : "password"}
              id="password-input"
              placeholder="Contraseña"
              required
            />
            {/* 2. Agregamos onClick para cambiar el estado y cambiamos el icono */}
            <span
              id="toggle-password"
              className="material-symbols-outlined"
              onClick={() => setShowLoginPassword(!showLoginPassword)}
              style={{ cursor: 'pointer', userSelect: 'none' }} // Mejora la experiencia de click
            >
              {showLoginPassword ? "visibility" : "visibility_off"}
            </span>
          </div>

          <button type="submit">Entrar</button>
          <p>
            ¿No tienes cuenta? <a href="#" id="show-register-link" onClick={showRegister}> Crear una</a>
          </p>
        </form>

        {/* --- FORMULARIO DE REGISTRO --- */}
        <form id="register-form" style={{ display: isRegistering ? 'flex' : 'none' }}>
          <h2>Crear Cuenta</h2>
          <input type="text" id="register-username" placeholder="Nuevo usuario" required />

          <div className="password-container">
            {/* Repetimos la lógica para el formulario de registro */}
            <input
              type={showRegisterPassword ? "text" : "password"}
              id="register-password"
              placeholder="Nueva contraseña"
              required
            />
            <span
              id="toggle-register-password"
              className="material-symbols-outlined"
              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              {showRegisterPassword ? "visibility" : "visibility_off"}
            </span>
          </div>

          <button type="submit">Registrar</button>
          <p>
            ¿Ya tienes cuenta? <a href="#" id="show-login-link" onClick={showLogin}> Iniciar sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;