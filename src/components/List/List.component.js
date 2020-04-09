import React, {Component} from 'react';
import './listStyle.css';
import Card from '../Card/Card.component';
import Sort from '../Sort/Sort.component';

export default class listAllPokemon extends Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    
        this.state ={
            step : 0,
            Url: 'https://pokeapi.co/api/v2/pokemon/',
            pokemonAllList: [],
            pokemonList: []
        }
    }
    componentDidMount(){
          let page = this.state.step;
          fetch(`${this.state.Url}?offset=${page}&limit=20`)
          .then(response => response.json())
          .then((res) => {
            this.setState( {pokemonList: res.results} )
          })
    }
    nextPage = () => {
        const { step } = this.state
        this.setState({
            step : step + 20
        })
    }
    prevPage = () => {
        const { step } = this.state
        this.setState({
            step : step - 20
        })
    }
    onSubmit(event){
        event.preventDefault();
        let page = this.state.step;
        fetch(`${this.state.Url}?offset=${page}&limit=20`)
        .then(response => response.json())
        .then((res) => {
            console.log(res.results);
          this.setState(
              
            {pokemonList: res.results})
           
        })
    }
    render() {
        return (
        <React.Fragment>
          <Sort />
            <form onSubmit={this.onSubmit}>
                <button onClick= {this.prevPage}>Preview</button>
                <div className = "grid-box-card">
                    {this.state.pokemonList.map(pokemon =>
                        <Card 
                            key = {pokemon.name}
                            name = {pokemon.name}
                            url ={pokemon.url}
                        />
                    )}
                    <button onClick= {this.nextPage} >Next</button>
                   
                </div>
            </form>
          
        </React.Fragment>
        )
    }
}