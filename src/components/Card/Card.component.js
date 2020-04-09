import React, { Component } from 'react';
import './cardStyle.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '../Modal/Modal.component';


export default class SimpleCard extends Component {
    constructor(props){
        super(props);

        this.state = {
           name : '',
           id : '',
           src: '',
           showModal: false,

           pokemonBasicInfo: '',
           pokemonAbilities: [],
           pokemonType: [],
           pokemonSrc : [],
           pokemonStat: []
        }
    }
    componentDidMount(){
        const {name, url} = this.props;
        const splitUrl = url.split('/');
        const id = splitUrl[6];

        fetch(`${url}`)
          .then(response => response.json())
          .then((res) => {
                this.setState({src : res.sprites})
          })

        this.setState({
            name,
            id
        })
    }

    showModal = () =>{
      this.setState({
        ...this.state,
        show: !this.state.show
      });
      
    }
  render() {
    return (   
      <Card className = "main-card" variant="outlined"> 
        <CardContent>
        <Typography className="card-title" color="textSecondary" gutterBottom>
            {this.state.name} id:{this.state.id}
        </Typography>
        <img src = {this.state.src.front_default}></img>
        <Button id = {this.state.id} onClick = {this.showModal} size="large">ZOBACZ</Button>
        <Modal 
          onClose={this.showModal} 
          showModal = {this.state.show} 
          message= {this.state.name}  
          src = {this.state.src.front_default}
          >
        </Modal>
        </CardContent>
      </Card>
    );
  }

 
}
