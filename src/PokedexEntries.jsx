import React, { useState, useEffect } from 'react';

function PokedexEntries({ pokemonId }) {
  const [englishPokedexEntries, setEnglishPokedexEntries] = useState([]);

  useEffect(() => {
    // Fetch Pokédex entries for the specified Pokémon ID from the API
    const fetchPokedexEntries = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokédex entries');
        }
        const data = await response.json();
        // Filter only the English Pokédex entries
        const englishEntries = data.flavor_text_entries.filter(entry => entry.language.name === 'en');
        setEnglishPokedexEntries(englishEntries);
      } catch (error) {
        console.error('Error fetching Pokédex entries:', error);
      }
    };

    fetchPokedexEntries();
  }, [pokemonId]);

  return (
    <div className="pokedex-entries">
      <h2>Pokédex Entries - Pokémon ID: {pokemonId}</h2>
      {englishPokedexEntries.map((entry, index) => (
        <div key={index} className="pokedex-entry">
          <div className='versionName'>
            {entry.version.name.toUpperCase()}
          </div>
          <div className='flavour_text'>
          {entry.flavor_text.replace('\f', ' ')}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokedexEntries;
