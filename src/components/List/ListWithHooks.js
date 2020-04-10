import React, {useState, useEffect} from 'react';
import './listStyle.css';
import Cards  from '../Card/CardWithHooks';
import TextField from '@material-ui/core/TextField';
import Pagination from '../Pagination/Pagination.component';


const List = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonListPerPage] = useState(18);
 
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964')
          .then(response => response.json())
          .then((res) => {
            setPokemonList(res.results)
            res.results.map(pokemon =>
                pokemonNameList.push(pokemon.name)
            )
            console.log(pokemonNameList)
          })
        
     }, []);
     
     const [inputValue, setInputValue] = useState('');
     const [pokemonNameList, setPokemonNameList] = useState([]);
     const [result, setResult] = useState([]);
 
 
   
     const handleSubmit = (event) => {
        debugger;
        setResult([]);
        setPokemonList([]);
        const arrayOfFiltteredPokemons = pokemonNameList.filter(list => { return list.includes(inputValue)});
        arrayOfFiltteredPokemons.forEach((pokemon) => {
            getPokemonData(pokemon);
        });
        setPokemonList(result);
        event.preventDefault();
     }

    async function getPokemonData(pokemon) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)  
            const parsedResponse = await response.json();
            result.push({
                name: parsedResponse.name,
                url: 'https://pokeapi.co/api/v2/pokemon/'+ parsedResponse.id
            })
    }

    
  
    //CURRENT LIST
    const indexOfLastCard = currentPage * pokemonListPerPage;
    const indexOfFirstCard = indexOfLastCard - pokemonListPerPage;
    const currentCard = pokemonList.slice(indexOfFirstCard, indexOfLastCard);

    //CHANGE PAGE
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return(
    <div className = 'container-fluid'>
        <div>LISTA POKEMONÓW:</div>
        <TextField 
        id="standard-basic" 
        label="szukaj po nazwie" 
        value= {inputValue} 
        onChange = {event => setInputValue(event.target.value)}
        />
        <button onClick={handleSubmit}>Wyszukaj</button>
        <div className = "grid-box-card">
        </div>
        <Cards 
        pokemonList = {currentCard} 
        />
        
        <Pagination 
        pokemonListPerPage = {pokemonListPerPage} 
        totalCards = {pokemonList.length} 
        paginate = {paginate}

        />
    </div>
   
    );
}

export default List;