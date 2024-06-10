import React, { useState, useEffect } from 'react';

function Evolution({ id }) {

  function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    async function fetchEvolutionChain() {
      try {
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        const chain = [];
        let current = evolutionData.chain;

        while (current) {
          const speciesId = current.species.url.split('/').slice(-2, -1)[0];
          const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesId}/`);
          const pokemonData = await pokemonResponse.json();

          chain.push({
            id: speciesId,
            name: current.species.name,
            image: pokemonData.sprites.front_default,
          });

          current = current.evolves_to[0];
        }

        setEvolutionChain(chain);
      } catch (error) {
        console.error("Error fetching the evolution chain:", error);
      }
    }

    fetchEvolutionChain();
  }, [id]);

  if (!evolutionChain) {
    return <p>Loading Evolution Chain...</p>;
  }

  return (
    <>
      <h1>Evolution Chain:</h1>
      <div className="evolution-chain">
      {evolutionChain.map((pokemon) => (
        <div key={pokemon.id}>
          <p>{toSentenceCase(pokemon.name)}</p>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      ))}
    </div>
    </>
  );
}

export default Evolution;
