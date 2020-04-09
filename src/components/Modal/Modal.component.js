import React, { Component } from 'react';
import './modalStyle.css';

export default class Modal extends Component {
    onClose = (event) => {
        this.props.onClose && this.props.onClose(event);
    }


    render() {
        if(!this.props.showModal){
            return null;
        }
        return (
            <div className = "background-style">
                <div className = "modal-box-style">
                    {this.props.message}
                    <img src = {this.props.src}></img>
                    <div>
                        <button className = "modal-button-style" onClick = {(event) => {this.onClose(event)}}>Close</button>
                    </div>
                </div>
              
            
            </div>
        )
    }
}