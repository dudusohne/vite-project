<template>
  <div class="header">
    <div class="wrapper">
      <img class="logo" src="./assets/pokemonlogo.png" alt="pokemon logo" />
      <span>CHALLENGE</span>
    </div>
  </div>
  <Layout />
</template>

<script setup lang="ts">
import Layout from "./Layout/Layout.vue";
</script>

<style lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 2px 3px 1px 30px;
  border-bottom: 1px solid rgb(243, 243, 243);
  align-self: center;
  
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      font-weight: bold;
      font-size: 22px;
      color: rgb(19, 111, 187);
      letter-spacing: 1.2px;
    }
    .logo {
      width: 15rem;
    }
  }

  p {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    font-weight: bold;
    font-size: 22px;
    margin-left: 2rem;
  }
}
</style>
