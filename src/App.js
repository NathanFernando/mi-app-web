import React, { useState, useEffect } from 'react';
import './style.css';

// --- COMPONENTES ---
import Header from './components/Header';
import WeatherInfo from './components/WeatherInfo';
import MessageSection from './components/MessageSection';
import LoginModal from './components/LoginModal';

// --- IMÁGENES ---
import searchCityImg from './assets/message/search-city.png';
import notFoundImg from './assets/message/not-found.png';
import cloudsImg from './assets/weather/clouds.svg';
import thunderstormImg from './assets/weather/thunderstorm.svg';
import clearImg from "./assets/weather/clear.svg";
import rainImg from "./assets/weather/rain.svg";
import snowImg from "./assets/weather/snow.svg";
import drizzleImg from "./assets/weather/drizzle.svg";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const openLoginModal = () => setIsModalOpen(true);
  const closeLoginModal = () => setIsModalOpen(false);

  const handleLoginSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    closeLoginModal();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setWeatherData(null);
  };

  const getCurrentDate = () => {
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return new Date().toLocaleDateString('es-ES', options);
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Thunderstorm': return thunderstormImg;
      case 'Drizzle': return drizzleImg;
      case 'Rain': return rainImg;
      case 'Snow': return snowImg;
      case 'Clear': return clearImg;
      case 'Clouds': return cloudsImg;
      default: return cloudsImg;
    }
  };

  const handleSearch = async (city) => {
    try {
      // 1. Detectar quién es el usuario para el historial
      const userQuery = currentUser ? currentUser.username : 'Invitado';

      // 2. Enviar username en la URL
      const urlWeather = `http://192.168.1.49:4000/api/weather?city=${city}&username=${userQuery}`;

      console.log("Pidiendo clima a:", urlWeather);

      const responseWeather = await fetch(urlWeather);

      if (!responseWeather.ok) {
        setNotFound(true);
        setWeatherData(null);
        return;
      }

      const dataWeather = await responseWeather.json();

      // Pronóstico
      const urlForecast = `http://192.168.1.49:4000/api/forecast?city=${city}`;
      const responseForecast = await fetch(urlForecast);
      const dataForecast = await responseForecast.json();

      const dailyForecast = dataForecast.list.filter(reading => reading.dt_txt.includes("12:00:00"));

      const forecastList = dailyForecast.slice(0, 4).map(day => {
        const dateOptions = { day: '2-digit', month: 'short' };
        const dateString = new Date(day.dt_txt).toLocaleDateString('es-ES', dateOptions);
        return {
          date: dateString,
          temp: Math.round(day.main.temp),
          icon: getWeatherIcon(day.weather[0].main)
        };
      });

      const mappedData = {
        city: dataWeather.name,
        date: getCurrentDate(),
        temp: Math.round(dataWeather.main.temp),
        condition: dataWeather.weather[0].description,
        icon: getWeatherIcon(dataWeather.weather[0].main),
        humidity: dataWeather.main.humidity,
        wind: dataWeather.wind.speed,
        forecast: forecastList
      };

      setWeatherData(mappedData);
      setNotFound(false);

    } catch (error) {
      console.error("Error al conectar con el Backend:", error);
      setNotFound(true);
    }
  };

  return (
    <>
      <main className="main-container">
        <Header
          onSearch={handleSearch}
          onLoginClick={openLoginModal}
          user={currentUser}
          onLogout={handleLogout}
        />

        {notFound ? (
          <MessageSection image={notFoundImg} title="No se encontró" text="La ciudad que busca no se encuentra." className="not-found" />
        ) : weatherData ? (
          <WeatherInfo data={weatherData} />
        ) : (
          <MessageSection image={searchCityImg} title="BUSCAR CIUDAD" text="Averigua el clima de cualquier ciudad del mundo." className="search-city" />
        )}
      </main>

      <LoginModal
        style={{ display: isModalOpen ? 'flex' : 'none' }}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default App;