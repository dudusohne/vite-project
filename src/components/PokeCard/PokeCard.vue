<template>
    <q-card light bordered class="bg-grey-3 my-card" @click="props.pokemon.clicked">
        <q-card-section>
            <div class="card-section">
                <span>{{ props.pokemon.entry_number }}</span>
                <img :src="props.pokemon.img" alt="image" />
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