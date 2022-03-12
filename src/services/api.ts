import axios from "axios";

const api = axios.create({
  baseURL: `https://pokeapi.co/api/v2/`,
});

//bring all request responsibility to here
export default {
  allPokemons() {
    return api.get(`pokedex/2/`);
  },
  urlPokemon(url: string) {
    return api.get(url);
  },
  uniquePokemon(id: number) {
    return api.get(`pokemon-species/${id}`);
  },
  detailsPokemon(id: number) {
    return api.get(`pokemon/${id}`);
  }
};
