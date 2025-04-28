<template>
    <div class="relative max-w-[1200px] mx-auto px-4">
        <div>
            <CardText />
        </div>
        <div class="w-full h-0.25 mt-2 dark:bg-indigo-500 bg-cyan-500"></div>

        <div class="mt-6 flex flex-wrap flex-row items-center justify-center gap-12">
            <div v-for="(campaign, index) in myCampaign" :key="index">
                <SingleCard @click="gotoDetailView(campaign.campaignAddress)" :campaign="campaign" />
            </div>
        </div>

        <div class="shadow-(--purpleShadow) absolute top-[50%] left-[50%] -z-10 animate-pulse"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CardText from './cardText.vue';
import SingleCard from './singleCard.vue';
import { AshaContract } from '@/utils/contractInteraction.js';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
const store = useUserStore();
// 👇 Create empty reactive variables
const myCampaign = ref([]); // should be [] instead of null
const router = useRouter();

let contract = null; // no need to make contract reactive (not used in template)

function gotoDetailView(campaign_address) {
    router.push(`/detail-view/${campaign_address}`)
}

onMounted(async () => {
    contract = new AshaContract();
    const campaigns = await contract.getMyCampaign(store.userAddress);

    // optional: check if campaigns exist
    if (campaigns && campaigns.length > 0) {
        myCampaign.value = campaigns;
    }
})

</script>