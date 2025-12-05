import React, { useState, useEffect } from 'react';
import '../PokemonDetail.css';

const PokemonDetail = ({ pokemon, onBack }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const typeColors = {
    "Électrique": "#FFD86F",
    "Plante": "#9BCC50",
    "Feu": "#FD7D24",
    "Eau": "#4592C4",
    "Vol": "#77b5fe",
    "Normal": "#606060",
    "Psy": "#fd6c9e"
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!pokemonDetails) {
    return null;
  }

  return (
    <div className="detail-container">
      <button className="back-button" onClick={onBack}>
        ← Retour à la liste
      </button>

      <div className="detail-card">
        <div 
          className="detail-header" 
          style={{ backgroundColor: typeColors[pokemon.type] }}
        >
          <div className="detail-header-content">
            <h1>{pokemon.name}</h1>
            <p className="detail-number">#{String(pokemonDetails.id).padStart(3, '0')}</p>
          </div>
          <img
            src={pokemonDetails.sprites.other['official-artwork'].front_default || pokemonDetails.sprites.front_default}
            alt={pokemon.name}
            className="detail-image"
          />
        </div>

        <div className="detail-body">
          <div className="detail-section">
            <h3>Type</h3>
            <span
              className="detail-type-badge"
              style={{ backgroundColor: typeColors[pokemon.type] }}
            >
              {pokemon.type}
            </span>
          </div>

          <div className="detail-info-grid">
            <div className="info-box">
              <p className="info-label">Taille</p>
              <p className="info-value">{pokemonDetails.height / 10} m</p>
            </div>
            <div className="info-box">
              <p className="info-label">Poids</p>
              <p className="info-value">{pokemonDetails.weight / 10} kg</p>
            </div>
          </div>

          <div className="detail-section">
            <h3>Statistiques</h3>
            <div className="stats-container">
              {pokemonDetails.stats.map((stat) => (
                <div key={stat.stat.name} className="stat-row">
                  <div className="stat-info">
                    <span className="stat-name">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                  <div className="stat-bar-bg">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${(stat.base_stat / 255) * 100}%`,
                        backgroundColor: typeColors[pokemon.type]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>Capacités</h3>
            <div className="abilities-container">
              {pokemonDetails.abilities.map((ability) => (
                <span key={ability.ability.name} className="ability-badge">
                  {ability.ability.name.replace('-', ' ')}
                  {ability.is_hidden && ' (caché)'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
