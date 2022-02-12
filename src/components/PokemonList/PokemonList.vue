<template>
  <div class="pokemonlist">
    <!-- <div :v-for="(pokemon, i) in pokeData" :key="i">
      <p>{{ pokemon.name }}</p>
      <p>{{ pokemon.description }}</p>
      <p>{{ pokemon.location }}</p>
    </div> -->
    <p>pokemon list</p>
  </div>
</template>



<script setup lang="ts">
import { reactive, ref } from "vue";
import { Pokemon } from "../types";
import { api } from "../../services/api";
import axios from "axios";

// interface PokeListProps {
//   pokeData: Pokemon[];
// }


const pokeData = ref();

axios.get("https://pokeapi.co/api/v2/pokemon/").then(response => {
  const basicInfo = response.data.results;
  const promises = basicInfo.map((result: { url: string; }) => {
    return axios.get(result.url)
  })
  Promise.all(promises).then(response => {
    pokeData.value = response
  })
});
console.log(pokeData.value)


// api.getPokemon().then(data => {
//   pokeData.pokes = data;
// });
// api.then((response: { data: {} }) => {
//   pokeData.pokes = response.data;
// });
// console.log(pokeData.pokes);
</script>

<style>
.pokemonlist {
  display: flex;
  flex-direction: row;
  background-color: "blue";
}
</style>