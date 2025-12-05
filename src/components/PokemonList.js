import React, { useEffect, useState } from "react";
import "./PokemonList.css";

const PokemonList = ({ onSelectPokemon }) => {
  const [pokemons, setPokemons] = useState([]);

  // ✔️ Toutes les couleurs officielles
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

  // 📥 Charger depuis l'API
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            const info = await res.json();

            return {
              id: info.id,
              name: info.name,
              type: info.types[0].type.name,
              img: info.sprites.front_default
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("Erreur API:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="pokemon-container">
      <h2>Liste des Pokémon</h2>

      <div className="pokemon-grid">
        {pokemons.map((p) => (
          <div
            className="pokemon-card"
            key={p.id}
            onClick={() => onSelectPokemon(p)}
          >
            <img src={p.img} alt={p.name} className="pokemon-img" />
            <h3>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3>

            <span
              className="pokemon-type"
              style={{
                backgroundColor: typeColors[p.type] || "#AAA"
              }}
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
