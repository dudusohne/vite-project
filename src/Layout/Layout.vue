<template>
  <div class="layout">
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

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
</style>