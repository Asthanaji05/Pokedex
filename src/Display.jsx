import React from 'react'

function Display({pokemonData}) {
  if (!pokemonData) {
    return <p>Loading Display...</p>; // Loading component
  }
  return (
    <div>
          <p>HT: {pokemonData.height}</p>
          <p>WT: {pokemonData.weight}</p>
          <p>O: {pokemonData.order}</p>
          <p>B: {pokemonData.base_experience}</p>
    </div>
  )
}

export default Display