import React from "react";
import "./PokemonList.css";

const PokemonList = ({ onSelectPokemon }) => {
  const pokemons = [
    {
      name: "Pikachu",
      type: "Électrique",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      id: 25
    },
    {
      name: "Bulbizarre",
      type: "Plante",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      id: 1
    },
    {
      name: "Salamèche",
      type: "Feu",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      id: 4
    },
    {
      name: "Carapuce",
      type: "Eau",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      id: 7
    },
    {
      name: "Roucool",
      type: "Vol",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
      id: 16
    },
    {
      name: "Dodrio",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png",
      id: 85
    },
    {
      name: "Leviator",
      type: "Eau",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
      id: 130
    },
    {
      name: "Mewtwo",
      type: "Psy",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
      id: 150
    },
    {
      name: "Arceus",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
      id: 493
    }
  ];

  const typeColors = {
    "Électrique": "#FFD86F",
    "Plante": "#9BCC50",
    "Feu": "#FD7D24",
    "Eau": "#4592C4",
    "Vol": "#77b5fe",
    "Normal": "#606060",
    "Psy": "#fd6c9e"
  };

  return (
    <div className="pokemon-container">
      <h2>Liste des Pokémon</h2>
      <div className="pokemon-grid">
        {pokemons.map((p, index) => (
          <div
            className="pokemon-card"
            key={index}
            onClick={() => onSelectPokemon(p)}
          >
            <img src={p.img} alt={p.name} className="pokemon-img" />
            <h3>{p.name}</h3>
            <span
              className="pokemon-type"
              style={{ backgroundColor: typeColors[p.type] }}
            >
              {p.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
