import React from "react";

function FavoritesBar({ favorites, onSelectCity, onRemoveCity }) {
    if (!favorites || favorites.length === 0) {
        return (
            <div className="favorites-empty">
                <span className="material-symbols-outlined">star_border</span>
                <p>Elige hasta 4 ciudades favoritas para visualizar</p>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <h4 className="fav-title">Mis Favoritos ({favorites.length}/4)</h4>
            <div className="favorites-list">
                {favorites.map((city, index) => (
                    <div
                        key={index}
                        className="favorite-card"
                        onClick={() => onSelectCity(city)}
                    >
                        <span className="fav-city-name">{city}</span>
                        {/* Botón pequeño para eliminar desde la barra */}
                        <button
                            className="fav-remove-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // Evita que se seleccione la ciudad al borrarla
                                onRemoveCity(city);
                            }}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoritesBar;
