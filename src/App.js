

// Importamos 'useState' de React
import React, { useState } from 'react';
import './style.css';

// Importamos las imágenes que usaremos
import searchCityImg from './assets/message/search-city.png';
import notFoundImg from './assets/message/not-found.png';
import cloudsImg from './assets/weather/clouds.svg';
import thunderstormImg from './assets/weather/thunderstorm.svg';

//El Encabezado -----
//Hacemos que Header acepte una función "onSearch"
function Header({ onSearch }) {
  return (
    <header className="app-header">
      <div className="input-container">
        <input className="city-input" placeholder="Buscar Ciudad" type="text" />
        <button className="search-btn" onClick={onSearch}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      <div className="user-container">
        
        <div id="user-info" style={{ display: 'none' }}>
          <span id="welcome-msg"></span>
          <button id="logout-btn" className="login-btn">Salir</button>
        </div>
        <button id="login-btn" className="login-btn">
          <span className="material-symbols-outlined">login</span>
        </button>
      </div>
    </header>
  );
}
// La Información del Clima -----
// Hacemos que WeatherInfo acepte los datos como "props"
function WeatherInfo({ data }) {
  
  // Usamos los datos de "props" en lugar de texto estático
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
        <img src={data.icon} className="weather-summary-img" alt="Weather icon" />
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
            <img src={thunderstormImg} className="forecast-item-img" alt="Forecast icon" />
            <h5 className="forecast-item-temp">29 °C</h5>
          </div>
        ))}
      </div>
    </section>
  );
}

// Las Secciones de Mensajes -----
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

// El Modal de Login -----
function LoginModal({ style }) {
  return (
    <div id="login-modal" className="modal" style={style}>
      <div className="modal-content">
        <span className="close-btn">&times;</span>
        <form id="login-form">
          <h2>Iniciar Sesión</h2>
          <input type="text" id="username-input" placeholder="Nombre de usuario" required />
          <div className="password-container">
            <input type="password" id="password-input" placeholder="Contraseña" required />
            <span id="toggle-password" className="material-symbols-outlined">visibility_off</span>
          </div>
          <button type="submit">Entrar</button>
          <p>
            ¿No tienes cuenta? <a href="#" id="show-register-link">Crear una</a>
          </p>
        </form>
        <form id="register-form" style={{ display: 'none' }}>
          <h2>Crear Cuenta</h2>
          <input type="text" id="register-username" placeholder="Nuevo usuario" required />
          <div className="password-container">
            <input type="password" id="register-password" placeholder="Nueva contraseña" required />
            <span id="toggle-register-password" className="material-symbols-outlined">visibility_off</span>
          </div>
          <button type="submit">Registrar</button>
          <p>
            ¿Ya tienes cuenta? <a href="#" id="show-login-link">Iniciar sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}


// App -----
function App() {
  
  // Creamos un "estado" para guardar los datos del clima.
  // 'null' porque no hay datos al cargar la app.
  const [weatherData, setWeatherData] = useState(null);

  // Esta función se ejecutará cuando se haga clic en el botón de búsqueda
  const handleSearch = () => {
    // (en el futuro, aquí iría la llamada a la API)
    const datosSimulados = {
      city: "Londres",
      date: "Thu, 25 Oct",
      temp: 14,
      condition: "Lluvia Ligera",
      icon: cloudsImg, 
      humidity: 82,
      wind: 3.5,
    };

    // Actualizamos el estado con los nuevos datos
    setWeatherData(datosSimulados);
  };

  return (
    <>
      <main className="main-container">
        {/*Pasamos la función 'handleSearch' al Header */}
        <Header onSearch={handleSearch} />

        {/*Lógica de renderizado condicional */}
        {weatherData ? (
          // Si SÍ hay datos en 'weatherData', muestra el componente del clima
          <WeatherInfo data={weatherData} />
        ) : (
          // Si no hay datos (es 'null'), muestra el mensaje de bienvenida
          <MessageSection
            image={searchCityImg}
            title="BUSCAR CIUDAD"
            text="Averigua el clima de cualquier ciudad del mundo."
            className="search-city"
          />
        )}
        
        
        <MessageSection
            image={notFoundImg}
            title="No se encontro"
            text="La ciudad que busca no se encuentra."
            className="not-found"
            style={{ display: 'none' }} 
        />
      </main>

      <LoginModal style={{ display: 'none' }} />
    </>
  );
}

export default App;