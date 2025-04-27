<template>
    <div
        class=" rounded-ss-4xl rounded-ee-4xl group p-2 border-2 border-black/50 dark:border-white/50 card group relative z-[1] block h-[370px] w-[320px] cursor-pointer overflow-hidden  hover:-translate-y-2.5 hover:dark:shadow-(--purpleShadow) hover:shadow-(--cyanShadow) hover:dark:border-indigo-600/70 hover:border-cyan-600/70 transition-all duration-300">
        <div
            class="flex justify-center font-bold font-special text-center text-lg group-hover:text-cyan-600/70 group-hover:dark:text-indigo-600/70">
            <h1>{{ campaign.title }}</h1>
        </div>

        <div class="m-0.5 flex justify-between relative">
            <img :src="imgURL" class="h-[150px] w-full object-cover" @load="imageLoaded = true" v-show="imageLoaded" />

            <!-- Spinner -->
            <div v-if="!imageLoaded" class="flex h-[150px] w-full justify-center items-center">
                <VueSpinnerHourglass size="40px" class="dark:text-indigo-600 text-cyan-600" />
            </div>
        </div>
        <div class="mt-1">
            <div
                class="flex justify-between items-center p-1 min-h-[50px] w-full border-b-2 border-lightText/80 dark:border-darkText/80 rounded-lg">
                <h1 class="font-bold">
                    Created by
                </h1>
                <h2>
                    {{ formattedOwner }}
                </h2>
            </div>

            <div
                class="flex justify-between items-center p-1 min-h-[50px] w-full border-b-2 border-lightText/80 dark:border-darkText/80 rounded-lg">
                <h1 class="font-bold">
                    Date
                </h1>
                <h2>
                    {{ formattedDate }}
                </h2>
            </div>
            <div
                class="flex justify-between items-center p-1 min-h-[50px] w-full border-b-2 border-lightText/80 dark:border-darkText/80 rounded-lg">
                <h1 class="font-bold">
                    Amount
                </h1>
                <h2>
                    {{ campaign.amount }} ETH
                </h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { VueSpinnerHourglass } from 'vue3-spinners';
import { ref } from 'vue';

const props = defineProps(['campaign'])

const imageLoaded = ref(false);

const formattedOwner = props.campaign.owner.slice(0, 6) + '...' + props.campaign.owner.slice(-4);

const formattedDate = new Date(props.campaign.date * 1000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

const imgURL = import.meta.env.VITE_PINATA_GATEWAY_URL + '/' + props.campaign.imageCid;

</script>