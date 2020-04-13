import React, { Component } from 'react';
import Cards from '../Card/CardWithHooks';
import './inputStyle.css';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      search: '',
      pokemonNameList: [],
      pokemonResultList: []
    }
  }
  onChangeInput(event) {
    this.setState({
      search: event.target.value,
      pokemonResultList: []
    })
  }
  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964`)
      .then(response => response.json())
      .then((res) => {
        res.results.map(pokemon => this.state.pokemonNameList.push(pokemon.name))
      })
  }
  onSubmit(event) {
    event.preventDefault();
    const namePokemon = this.state.search;
    let arrayWithResult = this.state.pokemonNameList;
    arrayWithResult = arrayWithResult.filter(list => list.includes(namePokemon));
    console.log(arrayWithResult);
    arrayWithResult.forEach(pokemon =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
        .then(response => response.json())
        .then((res) => {

          this.state.pokemonResultList.push({
            name: res.name,
            url: 'https://pokeapi.co/api/v2/pokemon/' + res.id
          })
          this.setState({ pokemonResultList: this.state.pokemonResultList })

        }));
    console.log(this.state.pokemonResultList)

    this.setState({ search: '' })
  }

  render() {

    return (
      <div className="container-search">
        <form onSubmit={this.onSubmit} className="form">
          <InputGroup size="lg">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg">WPISZ NAZWĘ</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={this.state.search} onChange={this.onChangeInput} required />
            <Button type="submit" variant="secondary">Szukaj</Button>
          </InputGroup>

        </form>
        <Cards
          pokemonList={this.state.pokemonResultList}
        />
      </div>
    );
  }
}

