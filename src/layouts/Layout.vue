<template>
    <div class="min-h-screen flex flex-col font-body">
        <HeaderMain />
        <main class="flex-grow relative overflow-hidden">
            <RouterView />
        </main>

        <FooterMain />
    </div>
</template>

<script setup>
import FooterMain from '@/components/footer/footerMain.vue';
import HeaderMain from '@/components/header/headerMain.vue';

</script>