import { useState, useEffect, useRef } from 'react';
import './App.css';
import pikachu from './pikachu.json';
import pikachuSpecies from './pikachu-species.json';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip'
import Graph from './Graph';
import PokedexEntries from './PokedexEntries';
import Cry from './Cry';
import Ability from './Ability';
import Moves from './Moves';
import Display from './Display';
import Evolution from './Evolution';
import logo from './assets/pokeball.png'

function App() {
  const [Id, setId] = useState(25);
  const [pokemonData, setPokemonData] = useState(pikachu);
  const [speciesData, setSpeciesData] = useState(pikachuSpecies);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [loadingSpecies, setLoadingSpecies] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState({ background: '#fff' });
  // const [infoContent, setInfoContent] = useState('');
  const [infoContentType, setInfoContentType] = useState('types');
  const [cry, setCry] = useState(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${Id}.ogg`);


  function increaseId(currentId) {
    currentId < 1025 ? setId(currentId + 1) : setId(1);
  }

  function decreaseId(currentId) {
    currentId > 1 ? setId(currentId - 1) : setId(1025);
  }

  useEffect(() => {
    async function fetchPokemonAndSpeciesData() {
      setLoadingPokemon(true);
      setLoadingSpecies(true);
      try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${Id}`);
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${Id}/`);
  
        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();
  
        setPokemonData(pokemonData);
        setSpeciesData(speciesData);
        
        setBackgroundGradientByColorName(speciesData.color.name);
        setLoadingPokemon(false);
        setLoadingSpecies(false);
  
        // Call showEvolution here if needed
        showEvolution(Id);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoadingPokemon(false);
        setLoadingSpecies(false);
      }
    }
  
    fetchPokemonAndSpeciesData();
  }, [Id]);
  

  const audioRef = useRef(null); // Use ref to control audio element
    const playCry = () => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      };
      const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);

      const spriteImages = [
        pokemonData.sprites.front_default,
        pokemonData.sprites.back_default,
        pokemonData.sprites.front_shiny,
        pokemonData.sprites.back_shiny
      ];
    
      const spriteAlts = ['Front Default', 'Back Default', 'Front Shiny', 'Back Shiny'];
    
      const handleClick = () => {
        const nextIndex = (currentSpriteIndex + 1) % spriteImages.length;
        setCurrentSpriteIndex(nextIndex);
      };

      function setBackgroundGradientByColorName(colorName) {
        const colorMap = {
          black: '#000000',
          blue: '#0000FF',
          brown: '#A52A2A',
          gray: '#808080',
          green: '#008000',
          pink: '#FFC0CB',
          purple: '#800080',
          red: '#FF0000',
          white: '#FFFFFF',
          yellow: '#FFFF00',
        };
        const color = colorMap[colorName] || 'rgba(255, 255, 255, 0.5)'; // Default to semi-transparent white if colorName not found
        const transparentColor = 'rgba(146, 144, 143, 0.5)'; // Transparent color for the gradient
        const backgroundImage = 'url(./assets/background.png)'; // Background image URL
      
        setBackgroundStyle({
          background: `
            ${backgroundImage}, /* Background image */
            linear-gradient(to bottom right, ${transparentColor}, ${color}) /* Linear gradient with transparency */
          `,
        });
      }
      

  function formatId(id) {
    return `#${String(id).padStart(4, '0')}`;
  }

  function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const showStats = () => {
    if (pokemonData) {
      console.log("Showing stats");
      return(
        <div className="stats">
          <h2>Stats</h2>
          <p>Defense: {pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
          <p>Attack: {pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
          <p>Special Attack: {pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</p>
          <p>Special Defense: {pokemonData.stats.find(stat => stat.stat.name === 'special-defense').base_stat}</p>
          <p>HP: {pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
        </div>
      );
    } else {
      return('Loading stats...');
    }
  };
  
  const showTypes = () => {
    return(
      <div>
        <h1>Types:</h1>
        {pokemonData.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
      </div>
    );
  };

  const showAbility = () => {
    return(
      <div>
            <h1>Abilities: </h1>
            {pokemonData.abilities.map((ability, index) => (
              <p key={index}>&#9658; {ability.ability.name}</p>
            ))}
    </div>
    )
  }
  
  const showEvolution = () => {
    return(<Evolution id={Id} />);
  };

 

  const showGraph = () =>{
    return(
      <Graph pokemonData={pokemonData}/>
    )
  }

  const showMoves =() =>{
    return(
      <Moves data={pokemonData}/>
    )
  }

  const showEntries =() => {
    return(
      <PokedexEntries pokemonId={Id} />
    )
  }

  const handleButtonClick = (contentType) => {
    setInfoContentType(contentType);
  };
  
  let infoContent;
  if (infoContentType === 'evolution') {
    infoContent = showEvolution(); // Function call karke JSX assign karna hoga
  } else if (infoContentType === 'stats') {
    infoContent = showStats(); // Function call karke JSX assign karna hoga
  } else if (infoContentType === 'types') {
    infoContent = showTypes(); // Function call karke JSX assign karna hoga
  }
  else if(infoContentType === 'ability'){
    infoContent = showAbility();
  }
  else if(infoContentType === 'graph'){
    infoContent = showGraph();
  }
  else if(infoContentType === 'move'){
    infoContent = showMoves();
  }
  else if(infoContentType === 'type'){
    infoContent = showTypes();
  }
  else if(infoContentType === 'entry'){
    infoContent = showEntries();
  }
  return(
    <>
      <div className='parent'>
      <div id="pokedex">
		    <div id="left">
		      <div id="top-left"></div>
		      <div id="top-left1">
		        <div id="glass-button">
		          <div id="reflect"></div>
		        </div>
		        <div id="top-buttons">
		          <div id="top-button-red"></div>
		          <div id="top-button-yellow"></div>
		          <div id="top-button-green"></div>
		        </div>
		      </div>
		      <div id="top-left2"></div>
		      <div id="logo"><img src={logo} alt="logo pokedex"/>
		      </div>
		      <div id="border-screen">
		        <div id="button-top1"></div>
		        <div id="button-top2"></div>
		        <div id="button-bottom"  onClick={playCry} data-tooltip-id="cry" data-tooltip-content="Click to hear cry!" >
            <audio ref={audioRef} src={cry}></audio>
    </div>

    <Tooltip id="cry" place="bottom" 
    style={{ backgroundColor: "#337ab7", color: "#f0ad4e" }}/>


		        <p className="selectDisable">&equiv;&equiv;</p>
		      </div>
		      <div id="screen">
            <div>
              
            <img src={spriteImages[currentSpriteIndex]}
        alt={spriteAlts[currentSpriteIndex]}
        onClick={handleClick} className='selectDisable' />
            <p>{pokemonData.name}</p>
            </div>
            <div>
            <p>HT: {pokemonData.height}</p>
            <p>WT: {pokemonData.weight}</p>
            </div>
            <div>
            <p>Order: {pokemonData.order}</p>
            <p>B_Exp: {pokemonData.base_experience}</p>
            </div>
            </div>
		      <div id="triangle"></div>
		      <div id="blue-button-left" data-tooltip-id="next" data-tooltip-content="Image" onClick={handleClick}>
            <p>A</p>
          </div>

          <Tooltip id="next" place='bottom'
    style={{ backgroundColor: "#337ab7", color: "#f0ad4e" }}/>

		      <div id="green-button-left">
            <p>START</p>
          </div>
		      <div id="orange-button-left">
            <p>SELECT</p>
          </div>
		      <div id="square-button-left">
		        <input id="nb" name="howmuch" value={Id} />
		      </div>
		      <div id="cross">
		        <div id="mid-cross" >
		          <div id="mid-circle"></div>
		        </div>
		        <div id="top-cross" onClick={handleClick} >
		          <div id="upC"></div>
		        </div>
		        <div id="right-cross" data-tooltip-id='Increase' data-tooltip-content="Next Pokemon" data-tooltip-place='top' onClick={() => increaseId(Id)}>
		          <div id="rightC" ></div>
		        </div>
            <Tooltip id='Increase' style={{zIndex:300}}/>
		        <div id="bot-cross" onClick={handleClick}>
		          <div id="downC"></div>
		        </div>
		        <div id="left-cross" onClick={() => decreaseId(Id)} data-tooltip-id='Decrease' data-tooltip-content="Previous Pokemon" data-tooltip-place='top'>
		          <div id="leftC" ></div>
		        </div>
            <Tooltip id='Decrease' style={{zIndex:300}}/>
		      </div>
		    </div>
		      <div id="middle">
		        <div id="hinge1"></div>
		        <div id="hinge2"></div>
		        <div id="hinge3"></div>
		      </div>
		    <div id="right">
		      <div id="info-screen">
          {infoContent}
		      </div>
		      <div id="keyboard">
		        <div className="key" onClick={() => handleButtonClick('ability')}>Ab</div>
		        <div className="key"  onClick={() => handleButtonClick('evolution')}>Ev</div>
		        <div className="key" onClick={() => handleButtonClick('graph')}>Gph</div>
		        <div className="key" onClick={() => handleButtonClick('move')}>Mvs</div>
		        <div className="key" onClick={() => handleButtonClick('stats')}>Sts</div>
		        <div className="key" onClick={() => handleButtonClick('types')}>Typ</div>
		        <div className="key" onClick={() => handleButtonClick('entry')}>Entr</div>
		        <div className="key" onClick={playCry}>Cry</div>
		        <div className="key" ></div>
		        <div className="key" ></div>
		      </div>
		      <div id="green-button-right">
            <p>BACK</p>
          </div>
		      <div id="orange-button-right">
            <p>SETTINGS</p>
          </div>
		      <div id="left-cross-button">
		        <div id="leftT"></div>
		      </div>
		      <div id="right-cross-button">
		        <div id="rightT"></div>
		      </div>
		      <div id="cross-button">
		        <div id="left-red-cross"></div>
		      </div>
		      <div id="square-button-right1">
            <p>Data</p>
          </div>
		      <div id="square-button-right2">
            <p>Map</p>
          </div>
		    </div>
		      <div id="top-right1"></div>
		      <div id="top-right2" ></div>
		  </div>
      
      </div>
      

    </>
  );
}

export default App;
