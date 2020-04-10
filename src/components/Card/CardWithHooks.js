import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import InfoPokemon from './InfoPokemon';

import './cardStyle.css';

const Cards = ({pokemonList}) => {
    return(
       
    <div className ="grid-box-card">

        {pokemonList.map(card =>
            <Card style={{ width: '18rem' }} key={card.name}>
                <Card.Body>
                    <InfoPokemon url = {card.url}/>
                    <Card.Title>{card.name}</Card.Title>
                </Card.Body>
            </Card>
        )}
    </div>
       
    )
}

export default Cards;