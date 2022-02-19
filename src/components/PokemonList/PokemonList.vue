<template>
  <div class="pokemonlist q-gutter-md">
    <div class="pokeball">
      <!-- <img src="../../assets/ash.png" alt="ash" /> -->
      <p v-for="t in team">{{ t }}</p>
      <!-- <img src="../../assets/squirtle.png" alt="squirtle" /> -->
    </div>
    <!-- POKEMON CARD -->
    <q-card
      light
      bordered
      class="bg-grey-3 my-card"
      v-for="(pokemon, i) in pokeData"
      :key="i"
      @click="details(pokemon.pokemon_species.url)"
      :pokemon="pokemon.id"
    >
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
    <!-- <Modal
      v-model="modal"
      :id="pokemon.id"
      :name="pokemon.name"
      :base_experience="pokemon.base_experience"
      :height="pokemon.height"
      :weight="pokemon.weight"
      :abilities="pokemon.abilities"
      :types="pokemon.types"
      :description="pokemon.description"
    />-->
    <!-- MODAL -->
    <q-dialog v-model="modal" transition-show="slide-down" transition-hide="slide-down">
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
              <div
                style="display: flex; flex-direction: row; margin-bottom: 10px; align-items: flex-start"
              >
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
                      <span
                        style="font-weight: 400; color: rgb(168, 168, 168); margin-right: 4px"
                      >HEIGHT:</span>
                      <span>{{ pokemon.height }}</span>
                    </p>
                    <p>
                      <span
                        style="font-weight: 400; color: rgb(168, 168, 168); margin-right: 4px"
                      >WEIGHT:</span>
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
            <q-btn
              color="black"
              label="ADICIONAR AO TIME"
              style="margin-right: 10px;"
              @click="handleAdd()"
            />
            <q-btn color="black" label="FECHAR" v-close-popup />
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, reactive } from "vue";
import InfoCard from "../InfoCard/InfoCard.vue";
import Modal from "../Modal/Modal.vue";
import { Pokemon } from '../types';
import api from '../../services/api';

const modal = ref(false);
// const team = ref<Pokemon[]>()
let team = ref<Pokemon>()
const pokeData = ref<Pokemon>();
const pokemon = reactive<Pokemon>({
  id: 0,
  name: "",
  base_experience: 0,
  height: 0,
  weight: 0,
  abilities: {
    ability: {
      ability: {
        name: '',
        url: ''
      }
    }
  },
  types: {
    type: {
      type: {
        name: '',
        url: '',
      }
    }
  },
  color: '',
  description: '',
});

onMounted(() => {
  pokemonList()
});

function handleAdd() {
  // team.value.push(pokemon)
  team.value = pokemon;
  console.log(team.value);
  modal.value = false;
}
/*
* Bring all pokemons from API
*/
const pokemonList = async () => {
  const response = await api.allPokemons()
  pokeData.value = response.data.pokemon_entries;
};

/*
* Handle's the pokemon image render
*/
function getPokemonImg(entryNumber: number): string {
  var str = "" + entryNumber;
  var pad = "000";
  const ans = pad.substring(0, pad.length - str.length) + str;
  const url = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/${ans}.png`;
  return url;
}

/*
* Handle's the pokemon details load/render
*/
async function details(url: string) {
  try {
    const urlResponse = await api.urlPokemon(url)
    pokemon.color = urlResponse.data.color.name;

    const descResponse = await api.uniquePokemon(urlResponse.data.id)
    const textResponses = descResponse.data.flavor_text_entries.filter(
      (element: string | any) => element.language.name == "en"
    );
    pokemon.description = textResponses[0].flavor_text;

    const pokemonResponse = await api.detailsPokemon(urlResponse.data.id)
    pokemon.abilities = pokemonResponse.data.abilities;
    pokemon.types = pokemonResponse.data.types;
    pokemon.weight = pokemonResponse.data.weight;
    pokemon.height = pokemonResponse.data.height;
    pokemon.name = pokemonResponse.data.name;
    pokemon.id = pokemonResponse.data.id;
    pokemon.types = pokemonResponse.data.types;
    pokemon.base_experience = pokemonResponse.data.base_experience;
    modal.value = true;
  } catch (err) {
    console.log('catch erro: ', err);
  }
};

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
    background-color: rgba(255, 255, 255, 0.459);
    padding: 1rem 0 1rem 0;
    z-index: 10;

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