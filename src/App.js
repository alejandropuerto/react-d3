import React, {useEffect, useState} from 'react'; //hooks
import axios from 'axios';
import './App.css';
import Graph from './Graph';
//import PieGender from './PieGender';

function App() {

  const [titles, setTitles] = useState([]); // destructuring

  useEffect(() => {
    //llamada a los datos de la API swapi.dev
      axios.get('https://api.jikan.moe/v3/top/anime/1/upcoming')
        .then((response) => {
          console.log(response.data)
          setTitles(response.data.results)
    })


  },[]) // 1 parametro lo que va a ejecutar, 2 param cuando se va a ejecutar
  //useEffect se va a ejecutar despues de que se pinta el html

  return (
    <div className="App">
      <Graph data={titles}/>
    </div>
  );
}

export default App;
