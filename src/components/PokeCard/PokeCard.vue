<template>
    <q-card light bordered class="bg-grey-3 my-card" @click="props.pokemon.clicked">
        <q-card-section>
            <div class="card-section">
                <span>{{ props.pokemon.entry_number }}</span>
                <img :src="getPokemonImg(props.pokemon.entry_number)" alt="image" />
                <span class="pokename">
                    {{
                        props.pokemon.pokemon_species.name
                    }}
                </span>
            </div>
        </q-card-section>
        <q-card-actions>
            <q-btn color="blue" label="VER DETALHES" @click="props.pokemon.clicked" />
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
import { Pokemon } from '../types'

interface Props {
    pokemon: Pokemon
}

const props = defineProps<Props>();

function getPokemonImg(entryNumber: number): string {
  var str = "" + entryNumber;
  var pad = "000";
  const ans = pad.substring(0, pad.length - str.length) + str;
  const url = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/${ans}.png`;
  return url;
}

</script>

<style scoped lang="scss">
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
</style>