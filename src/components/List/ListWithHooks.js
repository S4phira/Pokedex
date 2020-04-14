import React, { useState, useEffect, useReducer } from 'react';
import './listStyle.css';
import Cards from '../Card/CardWithHooks';
import Input from '../Input/Input.component';
import Pagination from '../Pagination/Pagination.component';
import Button from 'react-bootstrap/Button'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


const List = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonListPerPage] = useState(24);

    //refresh component
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964')
            .then(response => response.json())
            .then((res) => {
                setPokemonList(res.results)

            })

    }, []);

    const indexOfLastCard = currentPage * pokemonListPerPage;
    const indexOfFirstCard = indexOfLastCard - pokemonListPerPage;
    const currentCard = pokemonList.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const AscendingSortName = () => {
        const pokemonSort = pokemonList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        setPokemonList(pokemonSort)
        forceUpdate();
    }
    const DescendingSortName = () => {
        const pokemonSort = pokemonList.sort((a, b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0));
        setPokemonList(pokemonSort)
        forceUpdate();
    }

    return (
        <div>
            <div className="container-button">
                <Button variant="secondary" onClick={AscendingSortName}>ROSNĄCO<ArrowDropUpIcon></ArrowDropUpIcon></Button>
                <Button variant="secondary" onClick={DescendingSortName}>MALEJĄCO<ArrowDropDownIcon></ArrowDropDownIcon> </Button>
            </div>

            <Cards pokemonList={currentCard} />
            <Pagination
                pokemonListPerPage={pokemonListPerPage}
                totalCards={pokemonList.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

export default List;