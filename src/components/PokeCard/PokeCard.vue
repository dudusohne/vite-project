<template>
    <q-card light bordered class="bg-grey-3 my-card" @click="props.pokemon.clicked">
        <q-card-section>
            <div class="card-section">
                <div class="button-bckground">
                     <q-btn round>
                         <span>{{ props.pokemon.entry_number }}</span>
                     </q-btn>
                </div>
                <img :src="getPokemonImg(props.pokemon.entry_number)" alt="image" />
                <p class="pokename">
                    {{
                        props.pokemon.pokemon_species.name.toUpperCase()
                    }}
                </p>
            </div>
        </q-card-section>
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
    .button-bckground {
        width: 2rem;
        height: 2rem;
       
        span {
            font-weight: bold;
            font-size: 22px;
            color: rgb(109, 109, 109);
            
        }
    }
    img {
        align-self: center;
        max-width: 200px;
    }
    .pokename {
        font-size: 24px;
        color: rgb(66, 66, 66);
        align-self: center;
        font-weight: bold;
    }
}
</style>