<template>
    <div class="flex flex-row gap-4 items-center justify-end">
        <button
            class="p-2 rounded-lg dark:bg-darkSecondary bg-lightSecondary hover:scale-110 hover:shadow-(--purpleShadow) hover:dark:shadow-(--cyanShadow) transition-all duration-100"
            v-for="(category, index) in categories" :key="index" @click="sendCategory(category)">
            {{ category }}
        </button>
        <CoFilter class="text-2xl text-lightText dark:text-darkText" />
    </div>
</template>

<script setup>
import { CoFilter } from '@kalimahapps/vue-icons';
import { inject, defineEmits } from 'vue';

const categories = inject('categories');

const emit = defineEmits(['selectCategory']);

function sendCategory(category) {
    emit('selectCategory', category);
}
</script>