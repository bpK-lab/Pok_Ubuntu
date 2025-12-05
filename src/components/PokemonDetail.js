import React, { useState, useEffect } from 'react';
import '../PokemonDetail.css';

const PokemonDetail = ({ pokemon, onBack }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✔️ Couleurs officielles Pokédex
  const typeColors = {
    normal:  "#A8A77A",
    fire:    "#EE8130",
    water:   "#6390F0",
    electric:"#F7D02C",
    grass:   "#7AC74C",
    ice:     "#96D9D6",
    fighting:"#C22E28",
    poison:  "#A33EA1",
    ground:  "#E2BF65",
    flying:  "#A98FF3",
    psychic: "#F95587",
    bug:     "#A6B91A",
    rock:    "#B6A136",
    ghost:   "#735797",
    dragon:  "#6F35FC",
    dark:    "#705746",
    steel:   "#B7B7CE",
    fairy:   "#D685AD"
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

  if (!pokemonDetails) return null;

  // ✔️ Type principal (pour couleurs)
  const mainType = pokemonDetails.types[0].type.name;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={onBack}>
        ← Retour à la liste
      </button>

      <div className="detail-card">
        {/* HEADER */}
        <div
          className="detail-header"
          style={{ backgroundColor: typeColors[mainType] }}
        >
          <div className="detail-header-content">
            <h1>{pokemonDetails.name}</h1>
            <p className="detail-number">
              #{String(pokemonDetails.id).padStart(3, '0')}
            </p>
          </div>

          <img
            src={
              pokemonDetails.sprites.other['official-artwork'].front_default ||
              pokemonDetails.sprites.front_default
            }
            alt={pokemon.name}
            className="detail-image"
          />
        </div>

        {/* BODY */}
        <div className="detail-body">

          {/* TYPES */}
          <div className="detail-section">
            <h3>Type(s)</h3>
            <div className="type-badge-container">
              {pokemonDetails.types.map((t) => (
                <span
                  key={t.type.name}
                  className="detail-type-badge"
                  style={{ backgroundColor: typeColors[t.type.name] }}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* SIZE + WEIGHT */}
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

          {/* STATS */}
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
                        backgroundColor: typeColors[mainType]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ABILITIES */}
          <div className="detail-section">
            <h3>Capacités</h3>
            <div className="abilities-container">
              {pokemonDetails.abilities.map((ability) => (
                <span key={ability.ability.name} className="ability-badge">
                  {ability.ability.name.replace('-', ' ')}
                  {ability.is_hidden && ' (cachée)'}
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
