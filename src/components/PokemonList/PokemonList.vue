<template>
  <div class="pokemonlist">
    <div class="pokecard" v-for="(pokemon, i) in pokeData" :key="i">
      <span>{{ pokemon.entry_number }}</span>
      <img :src="getPokemonImg(pokemon.entry_number)" alt="image" />
      <span>{{ pokemon.pokemon_species.name }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Pokemon } from "../types";
import { api } from "../../services/api";
import axios from "axios";

const pokeData = ref<any>();

onMounted(() => {
  pokemonList();
});

function pokemonList() {
  axios
    .get("https://pokeapi.co/api/v2/pokedex/2/")
    .then((res) => {
      let pokemonData = res.data.pokemon_entries;
      return (pokeData.value = pokemonData);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPokemonImg(entryNumber: number): any {
  var str = "" + entryNumber;
  var pad = "000";
  const ans = pad.substring(0, pad.length - str.length) + str;
  const urlBase = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/`;
  const url = `${urlBase}${ans}.png`;
  return url;
}
</script>

<style lang="scss" scoped>
.pokemonlist {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 200px;
  .pokecard {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(240, 240, 240);
    width: 100%;
    min-width: 100px;
    border-radius: 12px;
    padding: 5px;
    margin-left: 1rem;
    box-shadow: 1px 0.2px 3px rgb(180, 180, 180);
    span {
      font-weight: bold;
      font-size: 16px;
    }
    img {
      width: 90px;
    }
  }
}
</style>