// src/App.js
import React, { useState } from "react";
import "./style.css";

// Importamos las imágenes 
import searchCityImg from "./assets/message/search-city.png";
import notFoundImg from "./assets/message/not-found.png";
import cloudsImg from "./assets/weather/clouds.svg";
import thunderstormImg from "./assets/weather/thunderstorm.svg";
import clearImg from "./assets/weather/clear.svg";
import rainImg from "./assets/weather/rain.svg";
import snowImg from "./assets/weather/snow.svg";
import drizzleImg from "./assets/weather/drizzle.svg";



const API_KEY = "144504665361b1ef22f6703428df2c77"; // API Key

// ----- COMPONENTE 1: El Encabezado -----
function Header({ onSearch, onLoginClick }) {
  //Necesitamos un estado local para guardar lo que el usuario escribe
  const [searchCity, setSearchCity] = useState("");

  const handleInputChange = (e) => {
    setSearchCity(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchCity.trim() !== "") {
      onSearch(searchCity); // Enviamos el texto a la función principal
    }
  };

  // Extra: Permitir buscar presionando "Enter"
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

// ----- COMPONENTE 2: La Información del Clima -----
function WeatherInfo({ data }) {
  return (
    <section className="weather-info">
      <div className="location-date-container">
        <div className="location">
          <span className="material-symbols-outlined">location_on</span>
          <h4 className="country-txt">{data.city}</h4>
        </div>
        <h5 className="current-date-txt regular-txt">{data.date}</h5>
      </div>

      <div className="weather-summary-container">
        <img
          src={data.icon}
          className="weather-summary-img"
          alt="Weather icon"
        />
        <div className="weather-summary-info">
          <h1 className="temp-txt">{data.temp}°C</h1>
          <h3 className="condition-txt regular-txt">{data.condition}</h3>
        </div>
      </div>

      <div className="weather-conditions-container">
        <div className="condition-item">
          <span className="material-symbols-outlined">water_drop</span>
          <div className="condition-info">
            <h5 className="regular-txt">Humedad</h5>
            <h5 className="humidity-value-txt">{data.humidity}%</h5>
          </div>
        </div>
        <div className="condition-item">
          <span className="material-symbols-outlined">air</span>
          <div className="condition-info">
            <h5 className="regular-txt">Vel Viento</h5>
            <h5 className="wind-value-txt">{data.wind} M/s</h5>
          </div>
        </div>
      </div>

      <div className="forecast-items-container">
        {[...Array(4)].map((_, index) => (
          <div className="forecast-item" key={index}>
            <h5 className="forecast-item-date regular-txt">05 Aug</h5>
            <img
              src={thunderstormImg}
              className="forecast-item-img"
              alt="Forecast icon"
            />
            <h5 className="forecast-item-temp">29 °C</h5>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----- COMPONENTE 3: Mensajes -----
function MessageSection({ image, title, text, className, style }) {
  return (
    <section className={`${className} section-message`} style={style}>
      <img src={image} alt={title} />
      <div>
        <h1>{title}</h1>
        <h4 className="regular-txt">{text}</h4>
      </div>
    </section>
  );
}

// ----- COMPONENTE 4: Login Modal -----
function LoginModal({ style, onClose }) {
  return (
    <div id="login-modal" className="modal" style={style}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <form id="login-form">
          <h2>Iniciar Sesión</h2>
          <input
            type="text"
            id="username-input"
            placeholder="Nombre de usuario"
            required
          />
          <div className="password-container">
            <input
              type="password"
              id="password-input"
              placeholder="Contraseña"
              required
            />
            <span id="toggle-password" className="material-symbols-outlined">
              visibility_off
            </span>
          </div>
          <button type="submit">Entrar</button>
          <p>
            ¿No tienes cuenta?{" "}
            <a href="#" id="show-register-link">
              Crear una
            </a>
          </p>
        </form>
        <form id="register-form" style={{ display: "none" }}>
          <h2>Crear Cuenta</h2>
          <input
            type="text"
            id="register-username"
            placeholder="Nuevo usuario"
            required
          />
          <div className="password-container">
            <input
              type="password"
              id="register-password"
              placeholder="Nueva contraseña"
              required
            />
            <span
              id="toggle-register-password"
              className="material-symbols-outlined"
            >
              visibility_off
            </span>
          </div>
          <button type="submit">Registrar</button>
          <p>
            ¿Ya tienes cuenta?{" "}
            <a href="#" id="show-login-link">
              Iniciar sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

// ----- COMPONENTE PRINCIPAL: App -----
function App() {
  const [weatherData, setWeatherData] = useState(null);
  // state para manejar si la ciudad no se encuentra
  const [notFound, setNotFound] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLoginModal = () => setIsModalOpen(true);
  const closeLoginModal = () => setIsModalOpen(false);

  // Función auxiliar para obtener la fecha actual formateada
  const getCurrentDate = () => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    return new Date().toLocaleDateString("es-ES", options);
  };

  // Función auxiliar para elegir icono según el clima
// Función auxiliar para elegir icono según el clima
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Thunderstorm':
        return thunderstormImg;
      case 'Drizzle':
        return drizzleImg;
      case 'Rain':
        return rainImg;
      case 'Snow':
        return snowImg;
      case 'Clear':
        return clearImg;
      case 'Clouds':
        return cloudsImg;
      default:
        return cloudsImg; // Por defecto (para Mist, Fog, Haze, etc.) usamos nubes
    }
  };

  // Esta función ahora recibe la ciudad y llama a la API
  const handleSearch = async (city) => {
    try {
      // 1. Construimos la URL
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

      // 2. Hacemos la petición
      const response = await fetch(url);
      const data = await response.json();

      // 3. Verificamos si hubo error (404 Not Found)
      if (data.cod === "404") {
        setNotFound(true);
        setWeatherData(null);
        return;
      }

      // 4. Si todo salió bien, procesamos los datos
      const mappedData = {
        city: data.name,
        date: getCurrentDate(),
        temp: Math.round(data.main.temp), // Redondeamos la temperatura
        condition: data.weather[0].description, // Descripción (ej: "nubes dispersas")
        icon: getWeatherIcon(data.weather[0].main), // Elegimos icono
        humidity: data.main.humidity,
        wind: data.wind.speed,
      };

      setWeatherData(mappedData);
      setNotFound(false); // Quitamos el error si existía
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setNotFound(true); // En caso de error de red, mostramos no encontrado
    }
  };

  return (
    <>
      <main className="main-container">
        <Header onSearch={handleSearch} onLoginClick={openLoginModal} />

        {/* LOGICA DE RENDERIZADO */}

        {/* Caso 1: Error de No Encontrado */}
        {notFound ? (
          <MessageSection
            image={notFoundImg}
            title="No se encontró"
            text="La ciudad que busca no se encuentra."
            className="not-found"
          />
        ) : weatherData ? (
          // Caso 2: Tenemos datos del clima
          <WeatherInfo data={weatherData} />
        ) : (
          // Caso 3: Estado inicial (Buscar ciudad)
          <MessageSection
            image={searchCityImg}
            title="BUSCAR CIUDAD"
            text="Averigua el clima de cualquier ciudad del mundo."
            className="search-city"
          />
        )}
      </main>

      <LoginModal
        style={{ display: isModalOpen ? "flex" : "none" }}
        onClose={closeLoginModal}
      />
    </>
  );
}

export default App;
