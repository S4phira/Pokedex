import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import List from '../List/List.component';
import Card from '../Card/Card.component';
import Sort from '../Sort/Sort.component';

export default class Input extends Component {
  constructor(props){
    super(props);

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      search: '',
      pokemonBasicInfo: '',
      pokemonAbilities: [],
      pokemonType: [],
      pokemonSrc : [],
      pokemonStat: [],
      pokemonNameList: [],
      pokemonResultList: []
      
  }
}
  onChangeInput(event){
    this.setState({
      search: event.target.value,
      pokemonResultList : []
    })
  }
  componentDidMount(){
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964`)
      .then(response => response.json())
      .then((res) => {
        res.results.map(pokemon => this.state.pokemonNameList.push(pokemon.name))
      })
  }
  onSubmit(event){
    event.preventDefault();
    const namePokemon = this.state.search;
    let arrayWithResult = this.state.pokemonNameList;
    arrayWithResult = arrayWithResult.filter(list => list.includes(namePokemon));
    console.log(arrayWithResult);
    arrayWithResult.forEach(pokemon =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      .then(response => response.json())
      .then((res) => {
        this.state.pokemonResultList.push(res)
        this.setState({pokemonResultList: this.state.pokemonResultList})
       
      }));

      this.setState({ search: ''})
  }

  render() {
    // const statsPokemonList = this.state.pokemonStat.map((stat) => <div><li>{stat.stat.name} : {stat.base_stat}</li></div> );
    // const abilityPokemonList = this.state.pokemonAbilities.map((ability) => <div>{ability.ability.name}</div>);
    // const typesPokemonList = this.state.pokemonType.map((type) => <div>{type.type.name}</div>)
    return(
        <div>
      <form  onSubmit={this.onSubmit}>
        <TextField id="standard-basic" label="szukaj po nazwie" value= {this.state.search} onChange = {this.onChangeInput} />
        <button>Wyszukaj</button>
        <div className = "grid-box-card">
          {this.state.pokemonResultList.map((r) =>
              <Card   
              key = {r.name}
              name = {r.name}
              url ={`https://pokeapi.co/api/v2/pokemon/${r.id}`}

              />)}
            </div>
      </form>
      <List />
       
      </div>
   );
  }
}

