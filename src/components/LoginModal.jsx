import React from 'react';

function LoginModal({ style, onClose }) {
  return (
    <div id="login-modal" className="modal" style={style}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <form id="login-form">
          <h2>Iniciar Sesión</h2>
          <input type="text" id="username-input" placeholder="Nombre de usuario" required />
          <div className="password-container">
            <input type="password" id="password-input" placeholder="Contraseña" required />
            <span id="toggle-password" className="material-symbols-outlined">visibility_off</span>
          </div>
          <button type="submit">Entrar</button>
          <p>¿No tienes cuenta? <a href="#" id="show-register-link">Crear una</a></p>
        </form>
        <form id="register-form" style={{ display: 'none' }}>
          <h2>Crear Cuenta</h2>
          <input type="text" id="register-username" placeholder="Nuevo usuario" required />
          <div className="password-container">
            <input type="password" id="register-password" placeholder="Nueva contraseña" required />
            <span id="toggle-register-password" className="material-symbols-outlined">visibility_off</span>
          </div>
          <button type="submit">Registrar</button>
          <p>¿Ya tienes cuenta? <a href="#" id="show-login-link">Iniciar sesión</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;