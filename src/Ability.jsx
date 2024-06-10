import React from 'react'

function Ability({data}) {
  if(!data){
    return <p>Loading Ability . . . . . </p>; 
  }
  return (
    <div className="abilities">
            <h1>Abilities: </h1>
            {data.abilities.map((ability, index) => (
              <p key={index}>&#9658; {ability.ability.name}</p>
            ))}
    </div>
  )
}

export default Ability