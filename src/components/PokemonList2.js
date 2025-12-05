import React from 'react';
import pokemons from '../datas/PokemonList.json'; // Import du fichier JSON
const PokemonList = () => {
return (
<div>
<ul>
{pokemons.map((pokemon, index) => (
<li key={index}>
{pokemon.name} - Type : {pokemon.type}
</li>
))}
</ul>
</div>
);
};
export default PokemonList;
