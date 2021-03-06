import React, {useEffect, useState} from 'react'; //hooks
import axios from 'axios';
import './App.css';
//import Graph from './Graph';
import GraphHorizontal from './Barplot-horizontal';
//import PieGender from './PieGender';

function App() {

  const [characters, setCharacters] = useState([]); // destructuring

  useEffect(() => {
    //llamada a los datos de la API swapi.dev
      //axios.get('https://anapioficeandfire.com/api/characters/') // game of thrones API
      axios.get('https://api.jikan.moe/v3/top/anime/1/upcoming') //Top upcoming anime API
      //axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=210')
      //axios.get('https://swapi.dev/api/people/')
        .then((response) => {
          console.log(response.data)
          setCharacters(response.data.top)//change .top for the data of your API
    })


  },[]) // 1 parametro lo que va a ejecutar, 2 param cuando se va a ejecutar
  //useEffect se va a ejecutar despues de que se pinta el html

  return (

    <div className="App">
      <p class="title">Top upcoming anime</p>
      <p class='subtitle'>as of July 31, 2020</p>
      <GraphHorizontal data={characters}/>
      <p class="source">SOURCE: MyAnimeList.net</p>
    </div>
  );
}

export default App;
