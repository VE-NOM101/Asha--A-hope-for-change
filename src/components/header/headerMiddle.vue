<template>
    <div
        class="text-md min-w-[500px] px-2 h-full rounded-lg bg-lightSecondary dark:bg-darkSecondary flex justify-around items-center">

        <router-link to="/" :class="linkClass('/')">
            Campaign
        </router-link>

        <router-link to="/create-campaign" :class="linkClass('/create-campaign')">
            Create Campaign
        </router-link>

        <router-link to="/dashboard" :class="linkClass('/dashboard')">
            Dashboard
        </router-link>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const linkClass = (path) => {
    const isActive = route.path === path;
    return [
        'rounded-2xl px-4 py-3 transition-all duration-500 hover:-translate-y-1.5',
        isActive ? 'bg-indigo-200' : '',
        isActive ? 'dark:bg-darkBgStart' : '',
        'hover:shadow-[var(--purpleShadow)] dark:hover:shadow-[var(--cyanShadow)]',
    ];
};
</script>