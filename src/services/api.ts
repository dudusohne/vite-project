import axios from "axios";

const api = axios.create({
  baseURL: `https://pokeapi.co/api/v2/`,
});

export default {
  allPokemons() {
    return api.get(`pokedex/2/`);
  },
  uniquePokemon() {

  }
}