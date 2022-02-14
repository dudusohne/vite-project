<template>
  <div class="pokeball">
    <img src="../../assets/ash.png" alt="ash" />
    <p>----    NENHUM POKEMON SELECIONADO    ----</p>
    <img src="../../assets/squirtle.png" alt="squirtle" />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
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
  background-color: #fff;
  padding: 1rem 0 1rem 0;

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
</style>