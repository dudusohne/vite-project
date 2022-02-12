<template>
  <div class="pokemonlist">
    <p>pokemon list</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Pokemon } from "../types";
import { api } from "../../services/api";
import axios from "axios";

const pokeData = ref<Pokemon[]>();

axios.get("https://pokeapi.co/api/v2/pokemon/").then(response => {
  const basicInfo = response.data.results;
  const promises = basicInfo.map((result: any) => {
    return axios.get(result.url)
  })
  Promise.all(promises).then(response => {
    response.forEach((pokemon: any) => {
      return pokeData.value = pokemon.data
    })
  })
});

console.log(pokeData.value)

</script>

<style>
.pokemonlist {
  display: flex;
  flex-direction: row;
  background-color: "blue";
}
</style>