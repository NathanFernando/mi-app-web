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


      {/* Renderizamos el pronóstico dinámico */}
      <div className="forecast-items-container">
        {data.forecast && data.forecast.map((item, index) => (
          <div className="forecast-item" key={index}>
            <h5 className="forecast-item-date regular-txt">{item.date}</h5>
            <img src={item.icon} className="forecast-item-img" alt="Forecast icon" />
            <h5 className="forecast-item-temp">{item.temp} °C</h5>
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
// CAMBIO: handleSearch ahora hace dos peticiones
  const handleSearch = async (city) => {
    try {
      // 1. Clima Actual (Current Weather)
      const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
      const responseWeather = await fetch(urlWeather);
      const dataWeather = await responseWeather.json();

      if (dataWeather.cod === '404') {
        setNotFound(true);
        setWeatherData(null);
        return;
      }

      // 2. Pronóstico (Forecast) - NUEVO ENDPOINT
      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
      const responseForecast = await fetch(urlForecast);
      const dataForecast = await responseForecast.json();

      // 3. Filtramos el pronóstico para obtener solo 1 dato por día (ej: a las 12:00:00)
      // La API devuelve datos cada 3 horas. Buscamos los que contienen "12:00:00"
      const dailyForecast = dataForecast.list.filter(reading => reading.dt_txt.includes("12:00:00"));

      // 4. Mapeamos los datos del pronóstico
      // Tomamos solo los primeros 4 días para que encaje en tu diseño
      const forecastList = dailyForecast.slice(0, 4).map(day => {
          const dateOptions = { day: '2-digit', month: 'short' };
          const dateString = new Date(day.dt_txt).toLocaleDateString('es-ES', dateOptions);
          
          return {
            date: dateString,
            temp: Math.round(day.main.temp),
             icon: getWeatherIcon(day.weather[0].main) // Reutilizamos tu función de iconos
          };
      });

      // 5. Guardamos TODO en el estado
      const mappedData = {
        city: dataWeather.name,
        date: getCurrentDate(),
        temp: Math.round(dataWeather.main.temp),
        condition: dataWeather.weather[0].description,
        icon: getWeatherIcon(dataWeather.weather[0].main),
        humidity: dataWeather.main.humidity,
        wind: dataWeather.wind.speed,
        forecast: forecastList // <--- Añadimos la lista procesada aquí
      };

      setWeatherData(mappedData);
      setNotFound(false);

    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setNotFound(true);
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
