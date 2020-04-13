import React from 'react';
import Card from 'react-bootstrap/Card';
import InfoPokemon from './InfoPokemon';

import './cardStyle.css';

const Cards = ({ pokemonList }) => {
    return (

        <div className="grid-box-card">

            {pokemonList.map(card =>
                <Card className="main-card" key={card.name}>
                    <Card.Body>

                        <InfoPokemon url={card.url} />

                    </Card.Body>
                </Card>
            )}
        </div>

    )
}

export default Cards;