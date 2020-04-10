import React, {useState,useEffect, forwardRef, useImperativeHandle } from 'react';
import './modalStyle.css';


const Modal = forwardRef(({name, image, id}, ref) => {

        const [display, setDisplay] = useState(false);

            useImperativeHandle(ref, () => {
                return {
                   openModal: () => openModal(),
                   close: () => closeModal()
                }
            })
   
        const openModal = () =>{
            setDisplay(true)
        };

        const closeModal = () =>{
            setDisplay(false)
        };

        if(display){
            return(

                <div className = "modal-wrapper">
                    <div onClick={closeModal} className = "modal-backdrop">
                        <div className = "modal-box">
                            <h1>{name}</h1>
                            <h5>{id}</h5>
                            <img src = {image}></img>
                            
                        </div>
                    </div>
                </div>
            )
        }
        return null;
    
       
    
    
    }
) 
 export default Modal;