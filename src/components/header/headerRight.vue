<template>
    <div class="text-md h-full rounded-lg flex justify-between items-center px-4">
        <button
            class="mr-4 flex justify-center items-center rounded-2xl p-3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% transition-all duration-500 hover:scale-110 dark:hover:shadow-(--cyanShadow) hover:shadow-(--purpleShadow)">

            <AkBitcoinFill class="mr-2 text-2xl" /> Connect Wallet
        </button>
        <button @click="toggle_mode"
            class="rounded-full bg-indigo-200 dark:bg-darkSecondary p-3 transition-all duration-500 dark:hover:shadow-(--cyanShadow) hover:shadow-(--purpleShadow)">

            <MdTwoToneBrightness2 v-if="mode === 'dark'" class="text-2xl" />
            <BsBrightnessHigh v-if="mode === 'light'" class="text-2xl" />
        </button>
    </div>
</template>

<script setup>
import { AkBitcoinFill } from '@kalimahapps/vue-icons';
import { BsBrightnessHigh } from '@kalimahapps/vue-icons';
import { MdTwoToneBrightness2 } from '@kalimahapps/vue-icons';
import { ref } from 'vue';

const mode = ref('dark');

const toggle_mode = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark');
}
</script>