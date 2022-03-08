<template>
    <div class="my-card" :style="{ 'background-color': props.pokemon.color }">
        <img :src="getPokemonImg(props.pokemon.id)" alt="image" />
        <div class="footer">
            <span class="pokename">
                {{
                    props.pokemon.name?.toUpperCase()
                }}
            </span>
            <q-btn
                round
                color="red"
                size="sm"
                text-color="white"
                icon="fa fa-trash"
                @click="props.pokemon.clicked"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Pokemon } from '../types'

interface Props {
    pokemon: Pokemon
}

const props = defineProps<Props>();

function getPokemonImg(id: number): string {
    var str = "" + id;
    var pad = "000";
    const ans = pad.substring(0, pad.length - str.length) + str;
    const url = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/${ans}.png`;
    return url;
}

</script>
<style scoped lang="scss">
.my-card {
    display: flex;
    flex-direction: column;
    height: 22px;
    border-radius: 12px;
    margin-left: 1rem;

    img {
        margin-top: -1.3rem;
        max-width: 120px;
        height: 120px;
    }
    .pokename {
        font-size: 14px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        margin-right: 1rem;
    }
    .footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: rgb(54, 54, 54);
        border-radius: 2px;
        padding: 8px;
    }
}
</style>