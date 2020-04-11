import React, {useState, useEffect, useReducer} from 'react';
import TextField from '@material-ui/core/TextField';
import Cards  from '../Card/CardWithHooks';


const Input = ({pokemonList}) => {
    const [pokemon, setPokemon] = useState(pokemonList);
    const [inputValue, setInputValue] = useState('');
    const [pokemonNameList, setPokemonNameList] = useState([]);
    const [result, setResult] = useState([]);
  //refresh component
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
   
    useEffect(function handleSubmit() {
        
    });
    
     const handleSubmit = (event) => {
        event.preventDefault();
        pokemonList.map(pokemon =>
            pokemonNameList.push(pokemon.name),
        )
         setResult([]);
         setPokemon([]);
         const arrayOfFiltteredPokemons = pokemonNameList.filter(list => { return list.includes(inputValue)});
        arrayOfFiltteredPokemons.forEach((pokemon) => {
             getPokemonData(pokemon);
         });
         setPokemon(result);
         
         
     }

    async function getPokemonData(pokemon) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)  
            const parsedResponse = await response.json();
            result.push({
                name: parsedResponse.name,
                url: 'https://pokeapi.co/api/v2/pokemon/'+ parsedResponse.id
            })
            forceUpdate();
    }


return(
 <div>
 
    <TextField 
        id="standard-basic" 
        label="szukaj po nazwie" 
        value= {inputValue} 
        onChange = {event => setInputValue(event.target.value)}
    />
    <button onClick ={handleSubmit}>Wyszukaj</button>

    <Cards 
        pokemonList = {pokemon} 
    />
    </div>
  
        
   
)

}

export default Input;