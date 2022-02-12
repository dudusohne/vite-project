<template>
  <div class="layout">
    <p>layout component</p>
    <PokemonList />
    <PokemonDetails />
    <Pokeball />
  </div>
</template>

<script setup lang="ts">
import Pokeball from "../components/Pokeball/Pokeball.vue";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails.vue";
import PokemonList from "../components/PokemonList/PokemonList.vue";
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  background-color: "green";
}
</style>