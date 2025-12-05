import React from "react";
import "../../Public/css/PokemonDetail.css";

const PokemonDetail = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>X</button>

        <img src={pokemon.img} alt={pokemon.name} className="detail-img" />

        <h2>{pokemon.name}</h2>

        <p>
          <strong>Type : </strong>
          <span className="detail-type">{pokemon.type}</span>
        </p>

        <p>
          <strong>Description :</strong><br />
          {pokemon.description}
        </p>
      </div>
    </div>
  );
};

export default PokemonDetail;

