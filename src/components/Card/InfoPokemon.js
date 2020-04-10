import React, {useState, useEffect} from 'react';
import Modal from '../Modal/Modal.component';

import Button from 'react-bootstrap/Button'

const Image = ({url}) => {
    const modalRef = React.useRef();

    const openModal = () => {
        modalRef.current.openModal()
    };


    const [pokemonUrl, setPokemonUrl] = useState([]);
    const [pokemonInfo, setPokemonInfo] = useState([]);

    useEffect(() => {
        fetch(`${url}`)
          .then(response => response.json())
          .then((res) => {
           setPokemonUrl(res.sprites)
           setPokemonInfo(res)

          })

     }, []);

    return(
    <div>
        <Button variant="primary" onClick = {openModal}>click</Button>
         <img src = {pokemonUrl.front_default}></img>
        <Modal 
            ref = {modalRef} 
            name = {pokemonInfo.name}
            image={pokemonUrl.front_default}
            id = {pokemonInfo.id}
       />
    </div>
    )
}

export default Image;