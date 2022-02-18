<template>
  <div class="pokemonlist q-gutter-md">
    <!-- POKEMON CARD -->
    <q-card light bordered class="bg-grey-3 my-card" v-for="(pokemon, i) in pokeData" :key="i" @click="details(pokemon.pokemon_species.url)" :pokemon="pokemon.id">
      <q-card-section>
        <div class="card-section">
          <span>{{ pokemon.entry_number }}</span>
          <img :src="getPokemonImg(pokemon.entry_number)" alt="image" />
          <span class="pokename">
            {{
              pokemon.pokemon_species.name.toUpperCase()
            }}
          </span>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn color="blue" label="VER DETALHES" @click="details(pokemon.pokemon_species.url)" />
      </q-card-actions>
    </q-card>
    <!-- MODAL -->
    <q-dialog v-model="bar2" transition-show="slide-down" transition-hide="slide-down">
      <q-card class="text-white">
        <div :style="{ 'background-color': pokemon.color }">
          <q-bar>
            <q-btn rounded>
              <span
                style="align-self: center; font-size: 25px; font-weight: bold;"
              >#{{ pokemon.id }}</span>
            </q-btn>
            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div style="display: flex; flex-direction: column; align-items: center">
              <div>
                <span
                  style="align-self: flex-start; font-size: 28px; font-weight: bold; color: rgb(31, 31, 31);"
                >{{ pokemon.name }}</span>
              </div>
              <img :src="getPokemonImg(pokemon.id)" alt="image" style="max-width: 300px" />
              <div style="display: flex; flex-direction: row; margin-bottom: 10px; align-items: flex-start">
                <InfoCard>
                  <span style="color: rgb(189, 189, 189)">POWER:</span>
                  <q-separator />
                  <p
                    style="font-size: 28px; font-weight: bold; color: rgb(255, 255, 255)"
                  >{{ pokemon.base_experience }}</p>
                </InfoCard>

                <InfoCard>
                  <span style="color: rgb(189, 189, 189)">ABILITIES:</span>
                  <q-separator />
                  <p v-for="abilt in pokemon.abilities">{{ abilt.ability.name }}</p>
                </InfoCard>

                <InfoCard>
                  <span style="color: rgb(189, 189, 189)">TYPE(S):</span>
                  <q-separator />
                  <div v-for="typ in pokemon.types">
                    <q-chip
                      class="flat"
                      :color="pokemon.color"
                      text-color="white"
                    >{{ typ.type.name }}</q-chip>
                  </div>
                </InfoCard>

                <InfoCard>
                  <span style="color: rgb(189, 189, 189)">INFO:</span>
                  <q-separator />
                  <div>
                    <p>
                      <span style="font-weight: 400; color: rgb(168, 168, 168); margin-right: 4px">HEIGHT:</span>
                      <span>{{ pokemon.height }}</span>
                    </p>
                    <p>
                      <span style="font-weight: 400; color: rgb(168, 168, 168); margin-right: 4px">WEIGHT:</span>
                      <span>{{ pokemon.weight }}</span>
                    </p>
                  </div>
                </InfoCard>
              </div>
              <q-btn dense style="padding: 10px 10px 0px 10px; background-color: rgb(88, 88, 88)">
                <div
                  style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;"
                >
                  <p style="color: rgb(189, 189, 189)">DESCRIPTION:</p>
                  <p style="color: rgb(223, 223, 223)">{{ pokemon.description }}</p>
                </div>
              </q-btn>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-btn color="black" label="ADICIONAR AO TIME" style="margin-right: 10px;" @click="clicked" />
            <q-btn color="black" label="FECHAR" v-close-popup />
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits } from "vue";
import axios from "axios";
import InfoCard from "../InfoCard/InfoCard.vue";

const bar2 = ref(false);

interface Pokemon {
  entry_number?: number;
  pokemon_species?: {
    name?: string;
    url?: string;
  };
  color?: string;
  description?: any;
  abilities?: string;
  height?: number;
  weight?: number;
  types?: string;
}

const pokeData = ref<Pokemon>();

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

function getPokemonImg(entryNumber: number): string {
  var str = "" + entryNumber;
  var pad = "000";
  const ans = pad.substring(0, pad.length - str.length) + str;
  const url = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/${ans}.png`;
  return url;
}

let pokemon: any = [];

function details(url: string) {
  axios
    .get(url)
    .then((res) => {
      pokemon.color = res.data.color.name;
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${res.data.id}`)
        .then((res) => {
          const textResponses = res.data.flavor_text_entries.filter(
            (element: any) => element.language.name == "en"
          );
          pokemon.description = textResponses[0].flavor_text;
        });
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${res.data.id}`)
        .then((res) => {
          pokemon.abilities = res.data.abilities;
          pokemon.types = res.data.types;
          pokemon.weight = res.data.weight;
          pokemon.height = res.data.height;
          pokemon.name = res.data.name;
          pokemon.id = res.data.id;
          pokemon.types = res.data.types;
          pokemon.base_experience = res.data.base_experience;

        });
    })
    .catch((err) => {
      console.log(err);
    });
  bar2.value = true;
}

function handleAddToList(pokemon: any) {
console.log(pokemon)
}

const emit = defineEmits(['clicked'])

function clicked() {
      emit("clicked");
}
</script>

<style lang="scss" scoped>
.pokemonlist {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: center;

  .card-section {
    display: flex;
    flex-direction: column;
    span {
      font-weight: bold;
      font-size: 18px;
      color: rgb(86, 87, 86);
    }
    img {
      align-self: center;
      max-width: 200px;
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