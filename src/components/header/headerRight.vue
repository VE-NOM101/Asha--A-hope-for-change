<template>
    <div class="text-md h-full rounded-lg flex justify-between items-center px-4 cursor-pointer">
        <div @click="connectWallet"
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

import { AkBitcoinFill } from '@kalimahapps/vue-icons';
import { BsBrightnessHigh } from '@kalimahapps/vue-icons';
import { MdTwoToneBrightness2 } from '@kalimahapps/vue-icons';
import { ethers } from 'ethers';

import { ref, computed, onMounted } from 'vue';

const { ethereum } = window;

const mode = ref('dark');
const address = ref(null);
const balance = ref(null);


const toggle_mode = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark');
}

// Network config
const networks = {
    sepolia: {
        chainId: `0x${Number(11155111).toString(16)}`, //
        chainName: "Ethereum Sepolia Testnet",
        nativeCurrency: {
            name: "SepoliaETH",
            symbol: "SepoliaETH",
            decimals: 18,
        },
        rpcUrls: [import.meta.env.PUBLIC_RPC_URL], // include full URL
        blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
};

const connectWallet = async () => {

    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }
    await ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(ethereum);
    const network = await provider.getNetwork();

    if (network.chainId !== 11155111) {
        try {
            await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${Number(11155111).toString(16)}` }],
            });
        } catch (switchError) {
            // This error means the network isn't added, so we try to add it
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [networks.sepolia],
                    });
                } catch (addError) {
                    console.error("Add chain error:", addError);
                }
            } else {
                console.error("Switch error:", switchError);
            }
        }
    }

    const signer = await provider.getSigner();
    address.value = await signer.getAddress();
    balance.value = await provider.getBalance(address.value);
};


const formattedBalance = computed(() => {
    if (!balance.value) return '0.0000' // fallback
    return ethers.formatEther(balance.value);
});

const formattedAddress = computed(() => {
    return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`;
});

</script>