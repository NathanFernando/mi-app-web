import React from 'react';
import thunderstormImg from '../assets/weather/thunderstorm.svg'; 

function WeatherInfo({ data, isFavorite, onToggleFavorite }) {
    return (
        <section className="weather-info">
            <div className="location-date-container">
                <div className="location">
                    <span className="material-symbols-outlined">location_on</span>
                    <h4 className="country-txt">{data.city}</h4>

                    {/* --- LÓGICA DE LA ESTRELLA (LIMPIA) --- */}
                    {onToggleFavorite && (
                        <span 
                            /* Aquí cambiamos la clase dinámicamente según isFavorite */
                            className={`material-symbols-outlined star-icon ${isFavorite ? 'active' : 'inactive'}`}
                            onClick={() => onToggleFavorite(data.city)}
                            title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                        >
                            {isFavorite ? 'star' : 'star_border'}
                        </span>
                    )}
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
                {data.forecast ? (
                    data.forecast.map((item, index) => (
                        <div className="forecast-item" key={index}>
                            <h5 className="forecast-item-date regular-txt">{item.date}</h5>
                            <img src={item.icon} className="forecast-item-img" alt="Forecast icon" />
                            <h5 className="forecast-item-temp">{item.temp} °C</h5>
                        </div>
                    ))
                ) : (
                    [...Array(4)].map((_, index) => (
                        <div className="forecast-item" key={index}>
                            <h5 className="forecast-item-date regular-txt">05 Aug</h5>
                            <img src={thunderstormImg} className="forecast-item-img" alt="Forecast icon" />
                            <h5 className="forecast-item-temp">29 °C</h5>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default WeatherInfo;