import React from 'react'

function Moves({data}) {
  return (
    <div className="moves">
            <h1>Moves: </h1>
            {data.moves.map((move, index) => (
              <p key={index}>&#9658; {move.move.name}</p>
            ))}
          </div>
  )
}

export default Moves