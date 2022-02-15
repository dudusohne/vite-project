<template>
  <div class="pokemonlist grid-container">
    <!-- <v-card color="#385F73" theme="dark">
      <v-card-title class="text-h5"> Unlimited music now </v-card-title>

      <v-card-subtitle
        >Listen to your favorite artists and albums whenever and wherever,
        online and offline.</v-card-subtitle
      >

      <v-card-actions>
        <v-btn variant="text"> Listen Now </v-btn>
      </v-card-actions>
    </v-card> -->
    <!-- <button
      type="button"
      class="pokecard"
      v-for="(pokemon, i) in pokeData"
      :key="i"
    >
      <span>{{ pokemon.entry_number }}</span>
      <img :src="getPokemonImg(pokemon.entry_number)" alt="image" />
      <span class="pokename">{{
        pokemon.pokemon_species.name.toUpperCase()
      }}</span>
    </button> -->
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
  const url = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/${ans}.png`;
  return url;
}
</script>

<style lang="scss" scoped>
.pokemonlist {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(90px, auto);
  row-gap: 1rem;
  .pokecard {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(240, 240, 240);
    border-radius: 12px;
    padding: 5px;
    margin-left: 1rem;
    box-shadow: 1px 0.2px 3px rgb(180, 180, 180);
    border: 1px solid rgb(202, 202, 202);
    :hover {
      border-radius: 8px;
    }
    span {
      font-weight: bold;
      font-size: 18px;
      color: rgb(86, 87, 86);
    }
    img {
      align-self: center;
      width: 100px;
    }
    .pokename {
      font-size: 18px;
      color: rgb(86, 87, 86);
      align-self: center;
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