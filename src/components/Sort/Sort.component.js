import React, {Component} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import Cards from '../Card/CardWithHooks';

export default class Sort extends Component{
    constructor(props){
        super(props);

        this.AscendingSort = this.AscendingSort.bind(this);
        this.DescendingSort = this.DescendingSort.bind(this);

        this.state = {
            pokemonNameList : [],
            ListPokemonSort :[],
            pokemonResultList:[]
        }
    }
    componentDidMount(){
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964`)
          .then(response => response.json())
          .then((res) => {
            res.results.map(pokemon => this.state.pokemonNameList.push(pokemon.name))
          })
      }
    AscendingSort(){
    //rosnąco A-Z w góre
        this.state.ListPokemonSort = this.state.pokemonNameList.sort();
        console.log(  this.state.ListPokemonSort);
      //   this.state.ListPokemonSort.forEach(pokemon =>
      //   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      // .then(response => response.json())
      // .then((res) => {
      //   this.state.pokemonResultList.push(res)
      //   this.setState({pokemonResultList: this.state.pokemonResultList})
       
      // }));

    }

    DescendingSort(){
    //Malejąco Z-A w dół
        this.state.pokemonNameList.sort();
        this.state.ListPokemonSort = this.state.pokemonNameList.reverse();
        console.log(  this.state.ListPokemonSort);
    } 

    render(){
        return (
            <div>
                <p>Sortuj :</p> 
                <button onClick = {this.DescendingSort}><ArrowDropDownIcon></ArrowDropDownIcon> </button>
                <button onClick = {this.AscendingSort}><ArrowDropUpIcon></ArrowDropUpIcon></button>
                <div className = "grid-box-card">
          
            <Cards
                pokemonList={this.state.pokemonResultList}
            />
            </div>
            </div>
        )
    }
    
}