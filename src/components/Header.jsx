import React, { useState } from "react";

function Header({ onSearch, onLoginClick }) {
    const [searchCity, setSearchCity] = useState("");

    const handleInputChange = (e) => {
        setSearchCity(e.target.value);
    };

    const handleSearchClick = () => {
        if (searchCity.trim() !== "") {
            onSearch(searchCity);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
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
                <div id="user-info" style={{ display: "none" }}>
                    <span id="welcome-msg"></span>
                    <button id="logout-btn" className="login-btn">
                        Salir
                    </button>
                </div>
                <button id="login-btn" className="login-btn" onClick={onLoginClick}>
                    <span className="material-symbols-outlined">login</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
