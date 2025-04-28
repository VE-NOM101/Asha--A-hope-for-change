<template>
    <div>
        <div v-if="loading" class="flex flex-col justify-center items-center w-full mt-12">
            <VueSpinnerFacebook size="100" class=" dark:text-indigo-600 text-cyan-600" />
            <h1 class="text-2xl font-special">Loading...</h1>
        </div>
        <div v-else class="relative max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-start mt-4 gap-6">
            <!-- Left Side - Image -->
            <DetailViewLeft />

            <!-- Right Side - Donation Form and Details -->
            <DetailViewRight />
        </div>

    </div>
</template>
``
<script setup>
import { onMounted, ref, reactive, provide } from 'vue'
import DetailViewLeft from './detailViewLeft.vue';
import DetailViewRight from './detailViewRight.vue';
import { useRoute } from 'vue-router';
import { AshaContract } from '@/utils/contractInteraction';
import { VueSpinnerFacebook } from 'vue3-spinners';

const route = useRoute();
const CampaignDetailData = reactive({
    'imageCid': '',
    'storyCid': '',
    'requiredFund': '',
    'receivedFund': '',
});

const loading = ref(true);
onMounted(async () => {
    const response = await fetchDetailData();
    CampaignDetailData.imageCid = response.imageCid;
    CampaignDetailData.storyCid = response.storyCid;
    CampaignDetailData.requiredFund = response.requiredFund;
    CampaignDetailData.receivedFund = response.receivedFund;
    loading.value = false;
});

async function fetchDetailData() {
    const contract = new AshaContract();
    const campaign_address = route.params.campaign_address;
    const response = await contract.fetchCampaign(campaign_address);
    return response;
}
provide('CampaignDetailData', CampaignDetailData);

</script>