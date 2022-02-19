<template>
    <q-dialog transition-show="slide-down" transition-hide="slide-down">
        <q-card class="text-white">
            <div :style="{ 'background-color': props.color }">
                <q-bar>
                    <q-btn rounded>
                        <span
                            style="align-self: center; font-size: 25px; font-weight: bold;"
                        >#{{ props.id }}</span>
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
                            >{{ props.name }}</span>
                        </div>
                        <img :src="props.img" alt="image" style="max-width: 300px" />
                        <div
                            style="display: flex; flex-direction: row; margin-bottom: 10px; align-items: flex-start"
                        >
                            <InfoCard>
                                <span style="color: rgb(189, 189, 189)">POWER:</span>
                                <q-separator />
                                <p
                                    style="font-size: 28px; font-weight: bold; color: rgb(255, 255, 255)"
                                >{{ props.base_experience }}</p>
                            </InfoCard>

                            <InfoCard>
                                <span style="color: rgb(189, 189, 189)">ABILITIES:</span>
                                <q-separator />
                                <p v-for="abilt in props.abilities">{{ props.abilities }}</p>
                            </InfoCard>

                            <InfoCard>
                                <span style="color: rgb(189, 189, 189)">TYPE(S):</span>
                                <q-separator />
                                <div v-for="typ in props.types">
                                    <q-chip
                                        class="flat"
                                        :color="props.color"
                                        text-color="white"
                                    >{{ props.types }}</q-chip>
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
                                        <span>{{ props.height }}</span>
                                    </p>
                                    <p>
                                        <span
                                            style="font-weight: 400; color: rgb(168, 168, 168); margin-right: 4px"
                                        >WEIGHT:</span>
                                        <span>{{ props.weight }}</span>
                                    </p>
                                </div>
                            </InfoCard>
                        </div>
                        <q-btn
                            dense
                            style="padding: 10px 10px 0px 10px; background-color: rgb(88, 88, 88)"
                        >
                            <div
                                style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;"
                            >
                                <p style="color: rgb(189, 189, 189)">DESCRIPTION:</p>
                                <p style="color: rgb(223, 223, 223)">{{ props.description }}</p>
                            </div>
                        </q-btn>
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-btn
                        color="black"
                        label="ADICIONAR AO TIME"
                        style="margin-right: 10px;"
                        @click="props.clicked"
                    />
                    <q-btn color="black" label="FECHAR" v-close-popup />
                </q-card-section>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import InfoCard from "../InfoCard/InfoCard.vue";
// import { Pokemon } from '../types';

interface Pokemon {
    id: number;
    entry_number?: number;
    pokemon_species?: {
      name?: string;
      url?: string;
    };
    name?: string;
    color?: string;
    description?: any;
    abilities: {
        ability: {
            ability: {
                name: string;
                url?: string;
            }
        };
    };
    height?: number;
    weight?: number;
    types?: {
        type: {
            type: {
                name: string;
                url?: string;
            }
        }
    }
    base_experience?: number;
    img?: any
    clicked?: () => void;
}

const props = defineProps<Pokemon>();
</script>