<template>
  <div class="pokeball">
    <img src="../../assets/ash.png" alt="ash" />
    <p>selected pokemon's list</p>
    <img src="../../assets/squirtle.png" alt="squirtle" />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.pokeball {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100px;
  padding: 0 0 0 1.2rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  img {
    height: 100px;
    border-radius: 12px;
    margin-right: 1.2rem;
  }
}
</style>