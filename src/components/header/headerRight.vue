<template>
    <div class="text-md h-full rounded-lg flex justify-between items-center px-4 cursor-pointer">
        <div @click="connect"
            class="max-w-[300px] mr-4 flex justify-center items-center rounded-2xl p-3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% transition-all duration-500 hover:scale-110 dark:hover:shadow-(--cyanShadow) hover:shadow-(--purpleShadow)">
            <AkBitcoinFill class="mr-2 text-2xl" />
            <div v-if="address === null">Connect Wallet</div>
            <div v-else class="flex justify-center items-center">
                <h1 class="text-lg">{{ formattedBalance }} ETH</h1>
                <h3 class="ml-2 bg-indigo-200 dark:bg-darkBgEnd rounded-lg px-2 py-1">{{ formattedAddress }}</h3>
            </div>
        </div>
        <button @click="toggle_mode"
            class="rounded-full bg-indigo-200 dark:bg-darkSecondary p-3 transition-all duration-500 dark:hover:shadow-(--cyanShadow) hover:shadow-(--purpleShadow)">

            <MdTwoToneBrightness2 v-if="mode === 'dark'" class="text-2xl" />
            <BsBrightnessHigh v-if="mode === 'light'" class="text-2xl" />
        </button>
    </div>
</template>

<script setup>
import { ethers } from 'ethers'; // <-- ADD THIS
import { AkBitcoinFill } from '@kalimahapps/vue-icons';
import { BsBrightnessHigh } from '@kalimahapps/vue-icons';
import { MdTwoToneBrightness2 } from '@kalimahapps/vue-icons';
import { connectWallet } from '@/utils/connectWallet';

import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const { ethereum } = window;
const store = useUserStore();

const mode = ref('dark');
const address = ref(null);
const balance = ref(null);

const toggle_mode = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
};

const connect = async () => {
    const response = await connectWallet();
    if (response) {
        address.value = response.address;
        balance.value = response.balance;
    }
};

const formattedBalance = computed(() => {
    if (!balance.value) return '0.0000'; // fallback
    return `${ethers.formatEther(balance.value).slice(0, 4)}`;
});

const formattedAddress = computed(() => {
    if (!address.value) return ''; // fallback
    return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`;
});

onMounted(async () => {
    ethereum.on("accountsChanged", async () => {
        await connect();
        store.setUserAddress(address.value);
    });
    await connect();
    store.setUserAddress(address.value);
});

</script>
