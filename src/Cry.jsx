import React from 'react'
import { useState, useEffect, useRef } from 'react';

function Cry({cry}) {
  if(!pokemonData || !Id){
    return (
      <p>Loading Cry . . . .</p>
    )
  }
    const audioRef = useRef(null); // Use ref to control audio element
    const playCry = () => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      };
  return (
    <>
    <div id="button-bottom">
            <button onClick={playCry} className='cry'>Play Cry</button>
            <audio ref={audioRef} src={cry}></audio>
    </div>
    </>
  )
}

export default Cry