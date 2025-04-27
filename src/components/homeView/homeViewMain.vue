<template>
    <div class="relative max-w-[1200px] mx-auto px-4">
        <div>
            <CardText />
        </div>
        <div>
            <CardTop @selectCategory="showCategory" />
        </div>
        <div class="w-full h-0.25 mt-2 dark:bg-indigo-500 bg-cyan-500"></div>

        <div class="mt-6 flex flex-wrap flex-row items-center justify-center gap-12">
            <div v-if="selectedCategory === 'All'" v-for="(campaign, index) in allCampaign" :key="index">
                <SingleCard @click="gotoDetailView(campaign.campaignAddress)" :campaign="campaign" />
            </div>

            <div v-if="selectedCategory === 'Education'" v-for="(campaign, index) in educationCampaign" :key="index">
                <SingleCard @click="gotoDetailView(campaign.campaignAddress)" :campaign="campaign" />
            </div>

            <div v-if="selectedCategory === 'Health'" v-for="(campaign, index) in healthCampaign" :key="index">
                <SingleCard @click="gotoDetailView(campaign.campaignAddress)" :campaign="campaign" />
            </div>
            <div v-if="selectedCategory === 'Animal'" v-for="(campaign, index) in animalCampaign" :key="index">
                <SingleCard @click="gotoDetailView(campaign.campaignAddress)" :campaign="campaign" />
            </div>
            <div v-if="selectedCategory === 'Refugee'" v-for="(campaign, index) in refugeeCampaign" :key="index">
                <SingleCard @click="gotoDetailView(campaign.campaignAddress)" :campaign="campaign" />
            </div>

            <div v-if="selectedCategory === 'Pendamic'" v-for="(campaign, index) in pendamicCampaign" :key="index">
                <SingleCard @click="gotoDetailView(campaign.campaignAddress)" :campaign="campaign" />
            </div>
        </div>

        <div class="shadow-(--purpleShadow) absolute top-[50%] left-[50%] -z-10 animate-pulse"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CardText from './cardText.vue';
import CardTop from './cardTop.vue';
import SingleCard from './singleCard.vue';
import { AshaContract } from '@/utils/contractInteraction.js';
import { useRouter } from 'vue-router';
// 👇 Create empty reactive variables
const allCampaign = ref([]); // should be [] instead of null
const healthCampaign = ref([]);
const educationCampaign = ref([]);
const animalCampaign = ref([]);
const refugeeCampaign = ref([]);
const pendamicCampaign = ref([]);
const router = useRouter();

let contract = null; // no need to make contract reactive (not used in template)



const selectedCategory = ref('All');

function showCategory(category) {
    selectedCategory.value = category;
    console.log(selectedCategory.value);
}

function gotoDetailView(campaign_address) {
    router.push(`/detail-view/${campaign_address}`)
}

onMounted(async () => {
    contract = new AshaContract();
    const campaigns = await contract.getAllCampaign();

    // optional: check if campaigns exist
    if (campaigns && campaigns.length > 0) {
        allCampaign.value = campaigns;
    }
    healthCampaign.value = await contract.getHealthCampaign();
    educationCampaign.value = await contract.getEducationCampaign();
    animalCampaign.value = await contract.getAnimalCampaign();
    refugeeCampaign.value = await contract.getRefugeeCampaign();
    pendamicCampaign.value = await contract.getPendamicCampaign();
})

</script>