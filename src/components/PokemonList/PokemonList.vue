<template>
  <div class="pokemonlist">
    <div class="pokecard" v-for="(pok, i) in pokeData" :key="i">
      <span>{{ pok.entry_number }}</span>
      <span>image</span>
      <span>{{ pok.pokemon_species.name }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Pokemon } from "../types";
import { api } from "../../services/api";
import axios from "axios";

const pokeData = ref<any>();

axios
  .get("https://pokeapi.co/api/v2/pokedex/2/")
  .then((res) => {
    let pokempodons = res.data.pokemon_entries;
    return (pokeData.value = pokempodons);
  })
  .catch((err) => {
    console.log(err);
  });
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
  }
}
</style>