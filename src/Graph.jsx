import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


function Graph({ pokemonData }) {
  if (!pokemonData) {
    return(<p> Loading . . . Graph .....</p>)
  }
  // Extracting stats from pokemonData
  const defense = pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat;
  const attack = pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat;
  const specialAttack = pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
  const specialDefense = pokemonData.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
  const hp = pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat;
  const speed = pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat;

  // Calculate the data for the bar graph
  const data = {
    labels: ['Defense', 'Attack', 'Special Attack', 'Special Defense', 'HP', 'Speed'],
    datasets: [{
      label: '',
      data: [defense, attack, specialAttack, specialDefense, hp, speed],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ],
      borderColor: [
        'black',
        'black',
        'black',
        'black',
        'black',
        'black'
      ],
      borderWidth: 1
    }]
  };

  // Define the options for the bar graph
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Pokemon Stats Graph',
      },
    },
  };

  return (
    <div className="stats-graph">
      <h2>{pokemonData.name}'s Stats Graph</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Graph;
