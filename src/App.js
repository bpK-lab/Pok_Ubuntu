import React, { useState } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="App">
      <h1 className="app-title">Mon Pokédex React</h1>
      {selectedPokemon ? (
        <PokemonDetail 
          pokemon={selectedPokemon} 
          onBack={() => setSelectedPokemon(null)} 
        />
      ) : (
        <PokemonList onSelectPokemon={setSelectedPokemon} />
      )}
    </div>
  );
}

export default App;
