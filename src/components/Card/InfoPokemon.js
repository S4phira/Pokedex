import React, { useState, useEffect } from 'react';
import './infopokemonStyle.css';
import Modal from '../Modal/Modal.component';

const Image = ({ url }) => {
    const modalRef = React.useRef();

    const openModal = () => {
        modalRef.current.openModal()
    };


    const [pokemonUrl, setPokemonUrl] = useState([]);
    const [pokemonInfoBase, setPokemonInfoBase] = useState([]);
    const [pokemonType, setPokemonType] = useState([]);
    const [pokemonTypeWeaknesses, setPokemonTypeWeaknesses] = useState([]);

    useEffect(() => {
        fetch(`${url}`)
            .then(response => response.json())
            .then((res) => {
                setPokemonUrl(res.sprites)
                setPokemonInfoBase(res)
                setPokemonType(res.types)
                res.types.map(type =>
                    fetch(type.type.url)
                        .then(response => response.json())
                        .then((res) => {
                            setPokemonTypeWeaknesses(res.damage_relations);

                        }
                        )

                )
            })

    }, []);



    const setColorType = (type) => {
        let color, weaknesses;
        switch (type) {
            case 'water': return color = '#60a0d4';
            case 'poison': return color = '#b97fc9';
            case 'grass': return color = '#9bcc50';
            case 'fire': return color = '#fd7d24';
            case 'bug': return color = '#729f3f';
            case 'flying': return color = '#3dc7ef';
            case 'normal': return color = '#a4acaf';
            case 'electric': return color = '#eed535';
            case 'ground': return color = '#ab9842';
            case 'fairy': return color = '#fdb9e9';
            case 'fighting': return color = '#d56723';
            case 'psychic': return color = '#f366b9';
            case 'rock': return color = '#f366b9';
            case 'dark': return color = '#707070';
            case 'dragon': return color = '#f16e57';
            case 'ghost': return color = '#7b62a3';
            case 'steel': return color = '#9eb7b8';
            case 'ice': return color = '#51c4e7';
        }
    }

    return (
        <div>
            <div className="info-pokemon" onClick={openModal}>
                <p className="card-title">{pokemonInfoBase.name}</p>
                <img src={pokemonUrl.front_default}></img>

                <ul className="type-pokemon">
                    {pokemonType.map(typePokemon =>
                        <div className="types-color-box" style={{ backgroundColor: setColorType(typePokemon.type.name) }}>
                            <li >{typePokemon.type.name}</li>
                        </div>
                    )}
                </ul>

            </div>

            <Modal
                ref={modalRef}
                params={pokemonInfoBase}
                image={pokemonUrl.front_default}
                id={pokemonInfoBase.id}
                pokemonTypeWeaknesses={pokemonTypeWeaknesses}
            />
        </div>
    )
}

export default Image;