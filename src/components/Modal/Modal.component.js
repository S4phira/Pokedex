import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import './modalStyle.css';


const Modal = forwardRef(({ image, params, pokemonTypeWeaknesses }, ref) => {


    const [display, setDisplay] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            openModal: () => openModal(),
            close: () => closeModal()
        }
    })

    const openModal = () => {
        setDisplay(true)
    };

    const closeModal = () => {
        setDisplay(false)
    };

    const setID = (id) => {
        if (id.toString().length === 1) {
            return `00${id}`
        }
        if (id.toString().length === 2) {
            return `0${id}`
        }
        else return id
    }

    const setColorType = (type) => {
        let color;
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
    const setText = (data) => {
        if (data === null)
            return <p className="no-data-text-modal">NO DATA</p>
        else return <img src={data}></img>
    }


    if (display) {
        return (

            <div className="modal-wrapper">
                <div onClick={closeModal} className="modal-backdrop">
                    <div className="modal-box">
                        <div class="image-box">
                            {setText(image)}
                            <ul className="type-pokemon">
                                {params.types.map(type =>
                                    <div className="types-color-box" style={{ backgroundColor: setColorType(type.type.name) }}>
                                        <li>{(type.type.name)}</li>
                                    </div>
                                )}
                            </ul>
                        </div>
                        <div className="info-box">
                            <h2>{params.name}</h2>
                            <p>#{setID(params.id)}</p>
                        </div>
                        <div className="stat-box">
                            {params.stats.map(stat =>
                                <li>{stat.stat.name} : {stat.base_stat}</li>
                            )}
                        </div>
                        <div className="parameters-box">
                            <p>height: {params.height} "</p>
                            <p>weight: {params.weight} Ibs</p>
                        </div>
                        <div className="abilities-box">
                            <p>Abilities:</p>
                            {params.abilities.map(ability => <li>{ability.ability.name}</li>)}


                        </div>
                        <div className="weaknesses-box">
                            <p>WEAKNESSES:</p>
                            <ul className="type-pokemon">
                                {pokemonTypeWeaknesses.double_damage_from.map(damage =>
                                    <div className="types-color-box" style={{ backgroundColor: setColorType(damage.name) }}>
                                        <li>{damage.name}</li>
                                    </div>
                                )}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    return null;

}
)
export default Modal;