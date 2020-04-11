import React, { useState, useEffect, useReducer } from 'react';
import './listStyle.css';
import Cards from '../Card/CardWithHooks';
import Input from '../Input/Input.component';
import Input2 from '../Input/InputWithHooks';
import Pagination from '../Pagination/Pagination.component';
import Button from 'react-bootstrap/Button'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


const List = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonListPerPage] = useState(18);

    //refresh component
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964')
            .then(response => response.json())
            .then((res) => {
                setPokemonList(res.results)
            })

    }, []);

    //CURRENT LIST
    const indexOfLastCard = currentPage * pokemonListPerPage;
    const indexOfFirstCard = indexOfLastCard - pokemonListPerPage;
    const currentCard = pokemonList.slice(indexOfFirstCard, indexOfLastCard);

    //CHANGE PAGE
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const AscendingSort = (event) => {
        const pokemonSort = pokemonList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        setPokemonList(pokemonSort)
        forceUpdate();
    }
    const DescendingSort = (event) => {
        const pokemonSort = pokemonList.sort((a, b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0));
        setPokemonList(pokemonSort)
        forceUpdate();
    }
    return (
        <div className='container-fluid'>
            <Input />
            <div>
                <p>Sortuj:</p>
                <Button onClick={DescendingSort}><ArrowDropDownIcon></ArrowDropDownIcon> </Button>
                <Button onClick={AscendingSort}><ArrowDropUpIcon></ArrowDropUpIcon></Button>
            </div>
            <Cards
                pokemonList={currentCard}
            />
            <Pagination
                pokemonListPerPage={pokemonListPerPage}
                totalCards={pokemonList.length}
                paginate={paginate}
            />
        </div>

    );
}

export default List;