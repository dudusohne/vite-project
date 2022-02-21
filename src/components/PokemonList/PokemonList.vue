<template>
  <div class="pokemonlist q-gutter-md">
    <div class="pokeball">
      <img src="../../assets/ash.png" alt="ash" />
      <p v-for="t in team">{{ t }}</p>
      <!-- <img src="../../assets/squirtle.png" alt="squirtle" /> -->
    </div>
    <!-- POKEMON CARD -->
    <PokeCard
      v-for="(pokemon, i) in pokeData"
      :key="i"
      :pokemon="pokemon"
      :entry_number="pokemon.entry_number"
      :img="getPokemonImg(pokemon.entry_number)"
      :pokemon_species="pokemon.pokemon_species.name.toUpperCase()"
      @click="details(pokemon.pokemon_species.url)"
    />
    <!-- MODAL -->
    <Modal
      v-model="modal"
      :pokemon="pokemon"
      :id="pokemon.id"
      :name="pokemon.name"
      :base_experience="pokemon.base_experience"
      :height="pokemon.height"
      :weight="pokemon.weight"
      :abilities="pokemon.abilities"
      :types="pokemon.types"
      :description="pokemon.description"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import InfoCard from "../InfoCard/InfoCard.vue";
import Modal from "../Modal/Modal.vue";
import { Pokemon } from '../types';
import api from '../../services/api';
import PokeCard from '../PokeCard/PokeCard.vue';

const modal = ref(false);
let team = ref<Pokemon>()
const pokeData = ref<Pokemon>();
const pokemon = reactive<Pokemon>({
  id: 0,
  name: "",
  base_experience: 0,
  pokemon_species: {
    name: '',
    url: '',
  },
  height: 0,
  weight: 0,
  abilities: {
    ability: {
      ability: {
        name: '',
        url: ''
      }
    }
  },
  types: {
    type: {
      type: {
        name: '',
        url: '',
      }
    }
  },
  color: '',
  description: '',
});

onBeforeMount(() => {
  pokemonList()
});

function handleAdd() {
  // team.value.push(pokemon)
  team.value = pokemon;
  console.log(team.value);
  modal.value = false;
}
/*
* Bring all pokemons from API
*/
const pokemonList = async () => {
  const response = await api.allPokemons()
  pokeData.value = response.data.pokemon_entries;
};

/*
* Handle's the pokemon image render
* todo: change to loadash
*/ 
function getPokemonImg(entryNumber: number): string {
  var str = "" + entryNumber;
  var pad = "000";
  const ans = pad.substring(0, pad.length - str.length) + str;
  const url = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/${ans}.png`;
  return url;
}

/*
* Handle's the pokemon details load/render
*/
async function details(url: string) {
  try {
    const urlResponse = await api.urlPokemon(url)
    pokemon.color = urlResponse.data.color.name;

    const descResponse = await api.uniquePokemon(urlResponse.data.id)
    const textResponses = descResponse.data.flavor_text_entries.filter(
      (element: string | any) => element.language.name == "en"
    );
    pokemon.description = textResponses[0].flavor_text;

    const pokemonResponse = await api.detailsPokemon(urlResponse.data.id)
    pokemon.abilities = pokemonResponse.data.abilities;
    pokemon.types = pokemonResponse.data.types;
    pokemon.weight = pokemonResponse.data.weight;
    pokemon.height = pokemonResponse.data.height;
    pokemon.name = pokemonResponse.data.name;
    pokemon.id = pokemonResponse.data.id;
    pokemon.types = pokemonResponse.data.types;
    pokemon.base_experience = pokemonResponse.data.base_experience;
    modal.value = true;
  } catch (err) {
    console.log('catch erro: ', err);
  }
};
</script>

<style lang="scss" scoped>
.pokemonlist {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: center;

  .pokeball {
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0;
    width: 100%;
    min-height: 100px;
    padding: 0 0 0 1.2rem;
    margin-bottom: 1rem;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.459);
    padding: 1rem 0 1rem 0;
    z-index: 10;

    p {
      font-size: 1.1rem;
      font-weight: medium;
      color: rgb(136, 136, 136);
    }

    img {
      height: 100px;
      border-radius: 12px;
      margin-right: 1.2rem;
    }
  }
}
#modal {
  position: absolute;
  top: 20px;
  left: 20px;
  border: 1px solid gray;
  background-color: white;
}
</style>