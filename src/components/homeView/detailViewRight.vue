<template>
    <div class="w-full md:w-1/2 flex flex-col gap-4 text-white">
        <!-- Campaign Title -->
        <h1 class="text-2xl font-bold font-special dark:text-darkText text-lightText">Need Funds for surgery</h1>

        <!-- Donation Input and Button -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <input type="number" :value="amountInEther" min="0" @input="amountInEther = Math.abs($event.target.value)"
                placeholder="Enter Amount To Donate(ETH)"
                class="dark:bg-darkSecondary bg-white dark:text-darkText text-lightText p-4 rounded-lg w-full md:w-1/2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:dark:ring-indigo-400" />
            <button @click="donateToCampaign">
                <div v-if="sending"
                    class="flex justify-center items-center dark:text-darkText text-lightText bg-gradient-to-r text-lg from-purple-500 to-indigo-500 hover:dark:shadow-(--cyanShadow) hover:shadow-(--purpleShadow) hover:-translate-x-1.5   font-bold py-4 px-8 rounded-lg transition-all duration-300 w-full md:w-auto">
                    <VueSpinnerIos size="35" />
                </div>
                <div class="flex justify-center items-center dark:text-darkText text-lightText bg-gradient-to-r text-lg from-purple-500 to-indigo-500 hover:dark:shadow-(--cyanShadow) hover:shadow-(--purpleShadow) hover:-translate-x-1.5   font-bold py-4 px-8 rounded-lg transition-all duration-300 w-full md:w-auto"
                    v-else>
                    <BxDonateBlood /> Donate
                </div>

            </button>
        </div>

        <!-- Required and Received Amount -->
        <div class="flex flex-col md:flex-row gap-4">
            <div class="dark:bg-darkSecondary bg-white p-4 rounded-lg flex-1 text-center">
                <p class="text-gray-400">Required Fund</p>
                <p class="text-xl font-bold text-lightText dark:text-darkText">{{ CampaignDetailData.requiredFund }} ETH
                </p>
            </div>
            <div class="dark:bg-darkSecondary bg-white p-4 rounded-lg flex-1 text-center">
                <p class="text-gray-400">Received Fund</p>
                <p class="text-xl font-bold text-lightText dark:text-darkText">{{ CampaignDetailData.receivedFund }} ETH
                </p>
            </div>
        </div>

        <!-- Recent Donations -->
        <div class="dark:bg-darkSecondary bg-white rounded-lg overflow-hidden">
            <div
                class="bg-gradient-to-r from-purple-500 to-indigo-500 text-lightText dark:text-darkText text-sm font-bold text-center py-2">
                RECENT DONATION</div>
            <div class="h-32 overflow-y-auto p-2">
                <!-- Donations list here -->
                <p class="text-center text-gray-400">No recent donations yet</p>
            </div>
        </div>

        <!-- My Past Donations -->
        <div class="dark:bg-darkSecondary bg-white rounded-lg overflow-hidden">
            <div
                class="bg-gradient-to-r  from-purple-400 to-indigo-500 text-lightText dark:text-darkText text-sm font-bold text-center py-2">
                MY PAST DONATION</div>
            <div class="h-32 overflow-y-auto p-2">
                <!-- Past donations list here -->
                <p class="text-center text-gray-400">No past donations yet</p>

            </div>
        </div>
    </div>
</template>

<script setup>
import { BxDonateBlood } from '@kalimahapps/vue-icons';
import { inject, ref, } from 'vue';
import toaster from '@/components/toaster/toaster.js';
import { AshaContract } from '@/utils/contractInteraction';
import { useRoute, useRouter } from 'vue-router';
import { VueSpinnerIos } from 'vue3-spinners';
const route = useRoute();
const CampaignDetailData = inject('CampaignDetailData');

const amountInEther = ref(0);
const sending = ref(false);

async function donateToCampaign() {
    if (amountInEther.value == 0) {
        toaster('error', 'Zero amount can not be donated');
        return;
    }

    const campaign_address = route.params.campaign_address;
    const contract = new AshaContract();
    sending.value = true;
    const response = await contract.donateToCampaign(campaign_address, amountInEther.value);
    sending.value = false;

    if (response.success) {
        toaster('success', response.message, 3000);

        const fetchResponse = await fetchDetailData();
        CampaignDetailData.receivedFund = fetchResponse.receivedFund;
    } else {
        toaster('error', response.message);
    }

    amountInEther.value = 0;
    return;
}


async function fetchDetailData() {
    const contract = new AshaContract();
    const campaign_address = route.params.campaign_address;
    const response = await contract.fetchCampaign(campaign_address);
    return response;
}

</script>