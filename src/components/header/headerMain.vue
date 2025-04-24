<template>

    <div
        class="px-4 py-2 min-w-screen h-[80px] border-b-2 border-cyan-500 dark:border-indigo-500 flex justify-around items-center">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
    </div>
</template>

<script setup>
import HeaderLeft from './headerLeft.vue';
import HeaderMiddle from './headerMiddle.vue';
import HeaderRight from './headerRight.vue';


</script>