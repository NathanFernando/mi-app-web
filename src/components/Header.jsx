import React, { useState } from "react";

// Recibimos los nuevos props 'user' y 'onLogout'
function Header({ onSearch, onLoginClick, user, onLogout }) {
    const [searchCity, setSearchCity] = useState("");

    const handleInputChange = (e) => setSearchCity(e.target.value);

    const handleSearchClick = () => {
        if (searchCity.trim() !== "") onSearch(searchCity);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearchClick();
    };

    return (
        <header className="app-header">
            <div className="input-container">
                <input
                    className="city-input"
                    placeholder="Buscar Ciudad"
                    type="text"
                    value={searchCity}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="search-btn" onClick={handleSearchClick}>
                    <span className="material-symbols-outlined">search</span>
                </button>
            </div>

            <div className="user-container">
                {/* RENDERIZADO CONDICIONAL: Si existe 'user', mostramos info. Si no, botón Login */}
                {user ? (
                    <div id="user-info" style={{ display: "flex" }}>
                        <span id="welcome-msg">Hola, {user.username}</span>
                        <button id="logout-btn" className="login-btn" onClick={onLogout}>
                            Salir
                        </button>
                    </div>
                ) : (
                    <button id="login-btn" className="login-btn" onClick={onLoginClick}>
                        <span className="material-symbols-outlined">login</span>
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
