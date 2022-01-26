import './App.css';
import { useEffect, useState } from 'react';
import Popup from './components/Popup';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon]=useState({});
  const [buttonPopup, setButtonPopup]= useState(false);
  // const [tablaPokemon, setTablaPokemon] = useState([]);
  const [busqueda, setBusqueda]=useState("");
  

  const fetchPokemon = (id) =>{
      fetch(` https://pokeapi.co/api/v2/pokemon/${id}`).then((response)=>
      response.json()
      ).then((data)=> setPokemon(data));
  };

  const fetchPokemonByName=()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`)
    .then((response) => response.json())
    .then((data) => setPokemon(data));
  }

  const getRandomInt = (min=1, max=600) => {
    return Math.floor(Math.random()*(max-min)+(min));
  }

  const getNextInt = (min=1, max=600)=>{
    if(pokemon.id >= max){
      return pokemon.id = min;
    }else{
      return pokemon.id+1;
    }
  }
  const getBackInt=(min=1, max=600)=>{
    if(pokemon.id <= min){
      return pokemon.id = max;
    }else{
      return pokemon.id -1;
    }
  }

  const handleChange = async e =>{
    e.persist();
    setBusqueda(e.target.value);
  }

  // const filtrar=(terminoBusqueda)=>{
  //   var resultado=tablaPokemon.filter((elemento)=>{
  //     if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
  //       return elemento;
  //     }
  //   });
  //   setPokemon(resultado);
  // }

  useEffect(()=>{
    console.log({pokemon});
    pokemon?.abilities?.map((ability)=> console.log(ability.ability.name));
  },[pokemon]);

  return (
    <div className="App">
      <header className="App-header">
        <a href='https://github.com/Eddsalasgit/Pokedex'>GitHub</a>
        <div className='flex-container'>
          <img src={pokemon?.sprites?.front_default
            ?? "https://pngimg.com/uploads/pokeball/pokeball_PNG20.png"}
            className="poke-image" alt="logo" />
          <img src={pokemon?.sprites?.back_default
            ?? "https://i.pinimg.com/originals/95/fc/30/95fc304b40461a9922bd1d3aff885496.png"}
            className="poke-image" alt="logo" />
        </div>
        <div className='datos'>
          <p className='pokemonId'>ID: {pokemon.id ?? "NO POKEMON SELECTED"}</p>
        </div>
        <div className='datos'>
          <p className='pokemonName'>Nombre: {pokemon.name ?? "NO POKEMON SELECTED"}</p>
        </div>
        
        <div className='flex-container'>
          {/* <button className='button' onClick={()=>fetchPokemon(getBackInt())}>Back</button> */}
           {pokemon.id ? (
            <>
              <button
                className="button"
                onClick={() => fetchPokemon(getBackInt())}
              >
                Back
              </button>{" "}
            </>
          ) : (
            <button className="button" onClick={() => fetchPokemon(600)}>
              Back
            </button>
          )}

          <button className='button'
            onClick={() => fetchPokemon(getRandomInt())}>Random</button>

          {/* <button className='button'
            onClick={() => fetchPokemon(getNextInt())}>Next</button> */}
          {pokemon.id ? (
            <>
              <button
                className="button"
                onClick={() => fetchPokemon(getNextInt())}
              >
                Next
              </button>{" "}
            </>
            ) : (
            <button className="button" onClick={() => fetchPokemon(1)}>
              Next
            </button>
            )
          }

          <button className='btn-abilities' 
          onClick={()=>setButtonPopup(true)}>Abilities</button>
        </div>

        <div className='Buscar'>
            <input type="text" placeholder="Buscar pokemon"
            value={busqueda} onChange={handleChange}></input>
            <button className='button' 
            onClick={()=>fetchPokemonByName()}>Buscar</button>
          </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>{pokemon.name}</h3>
          <ul className='text'>
             {pokemon?.abilities?.map((ability)=>(
               <li key={ability.ability.id}>
                 {ability.ability.name}
               </li>
             ))
             }
          </ul>
      </Popup>

      </header>
    </div>
  );
}

export default App;
