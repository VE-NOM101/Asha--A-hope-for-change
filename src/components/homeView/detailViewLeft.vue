<template>
    <div class="flex flex-col w-full md:w-1/2">
        <!-- Image Section -->
        <div class="w-full flex justify-center items-center">
            <img :src="imageURL" alt="Campaign Image" @load="imageLoaded = true" v-show="imageLoaded"
                class="rounded-lg shadow-lg object-cover w-full max-w-[600px] max-h-[400px]" />
            <!-- Spinner -->
            <div v-if="!imageLoaded" class="flex h-[150px] w-full justify-center items-center">
                <VueSpinnerHourglass size="40px" class="dark:text-indigo-600 text-cyan-600" />
            </div>
        </div>

        <!-- Text Section -->
        <div class="w-full flex justify-center items-center mt-4">
            {{ story }}
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';

import { VueSpinnerHourglass } from 'vue3-spinners';
const props = defineProps(['imageCid', 'storyCid']);
const imageURL = import.meta.env.VITE_PINATA_GATEWAY_URL + '/' + props.imageCid;
const storyURL = import.meta.env.VITE_PINATA_GATEWAY_URL + '/' + props.storyCid;
const imageLoaded = ref(false);
const story = ref('Loading');
async function fetchStory() {
    const response = await fetch(storyURL);
    const text = await response.text();
    story.value = text;
}

onMounted(async () => {
    fetchStory();
});
</script>