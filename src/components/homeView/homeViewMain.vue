<template>
    <div class="relative max-w-[1200px] mx-auto px-4">
        <div>
            <CardText />
        </div>
        <div>
            <CardTop />
        </div>
        <div class="w-full h-0.25 mt-2 dark:bg-indigo-500 bg-cyan-500 lg:block sm:hidden"></div>

        <div class="mt-6 flex flex-wrap md:flex-row sm:flex-col items-center justify-center gap-12">
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
        </div>

        <div class="  shadow-(--purpleShadow) absolute top-[50%] left-[50%] -z-10 animate-pulse"></div>
    </div>
</template>
<script setup>
import CardText from './cardText.vue';
import CardTop from './cardTop.vue';
import SingleCard from './singleCard.vue';

</script>