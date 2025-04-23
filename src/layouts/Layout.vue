<template>
    <main class="font-body relative overflow-hidden">
        <HeaderMain />
        <RouterView />
        <FooterMain />
    </main>
</template>

<script setup>
import FooterMain from '@/components/footer/footerMain.vue';
import HeaderMain from '@/components/header/headerMain.vue';

</script>