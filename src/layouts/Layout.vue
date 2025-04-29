<template>
    <!-- Main App -->
    <div class="min-h-screen flex flex-col font-body">
        <HeaderMain v-if="isMetaMaskInstalled" />

        <main class="flex-grow relative overflow-hidden">
            <RouterView v-if="isMetaMaskInstalled" />

            <div v-else
                class="flex items-center justify-center flex-col gap-4 bg-black/50 backdrop-blur-sm text-white text-center p-2 min-h-screen">
                <img src="/assets/metamask-icon.png" alt="MetaMask Logo" class="w-24 h-24 opacity-100" />
                <p class="text-2xl font-semibold font-special">MetaMask is not installed</p>
                <a href="https://metamask.io/download.html" target="_blank"
                    class="mt-2 text-blue-400 underline hover:text-blue-300 transition">
                    Install MetaMask
                </a>
            </div>
        </main>

        <FooterMain />
    </div>
</template>

<script setup>
import FooterMain from '@/components/footer/footerMain.vue';
import HeaderMain from '@/components/header/headerMain.vue';
import { provide, reactive, onMounted } from 'vue';

const categories = reactive(['All', 'Education', 'Health', 'Animal', 'Pendamic', 'Refugee']);

const isMetaMaskInstalled = window.ethereum ? true : false;
provide('categories', categories);
</script>