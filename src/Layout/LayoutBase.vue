<template>
  <div class="layout-base">
    <Pokeball />
    <PokemonList @clicked="handleAddItem()" />
  </div>
</template>

<script setup lang="ts">
import Pokeball from "../components/Pokeball/Pokeball.vue";
import PokemonList from "../components/PokemonList/PokemonList.vue";

interface Props {
  pokemonId: number;
}

const props = defineProps<Props>()

function handleAddItem() {
  console.log(props.pokemonId)
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
</style>