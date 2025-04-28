<template>
    <div>
        <div v-if="!newCampaign.loading">
            <div v-if="responseCampaign.campaignAddress === ''"
                class="mb-12 flex px-4 max-w-[1200px] mx-auto mt-[80px] justify-center items-baseline">
                <CreateCampaignLeft />
                <CreateCampaignRight />
            </div>
            <div v-else class="mb-12 flex px-4 max-w-[800px] mx-auto mt-[80px] justify-center items-baseline">
                <div
                    class="flex flex-col justify-center items-center w-full h-[50vh] rounded-2xl dark:bg-darkSecondary bg-lightSecondary">
                    <h1 class="text-4xl text-lightText dark:text-green-600 ">New Campaign Started Successfully</h1>
                    <h1 class="text-lg font-special">{{ responseCampaign.campaignAddress }}</h1>
                    <button @click="gotoCampaign"
                        class="m-4 px-4 py-2 text-2xl rounded-4xl bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90% transition-all duration-500 hover:scale-110 dark:hover:shadow-(--cyanShadow) hover:shadow-(--purpleShadow)">Go
                        to campaign</button>
                    <button @click="refreshPage"
                        class="m-4 px-4 py-2 text-2xl rounded-4xl bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90% transition-all duration-500 hover:scale-110 dark:hover:shadow-(--cyanShadow) hover:shadow-(--purpleShadow)">Create
                        Another Campaign</button>
                </div>
            </div>
        </div>
        <div v-else class="flex justify-center items-center mt-[200px]">
            <VueSpinnerRings size="160" class="text-purple-600 dark:text-indigo-600" />
        </div>
    </div>

</template>

<script setup>
import CreateCampaignLeft from './createCampaignLeft.vue';
import CreateCampaignRight from './createCampaignRight.vue';
import { VueSpinnerRings } from 'vue3-spinners';
import { provide, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const newCampaign = reactive({
    title: '',
    story: '',
    requiredAmount: '',
    category: 'Education',
    imageCid: '',
    storyCid: '',
    loading: false,

    resetValue() {
        this.title = '';
        this.story = '';
        this.requiredAmount = '';
        this.category = 'Education';
        this.imageCid = '';
        this.storyCid = '';
        this.loading = false;
    }
});

const responseCampaign = reactive({
    campaignAddress: '',
    resetValue() {
        this.campaignAddress = '';
    }
})

const refreshPage = () => {
    newCampaign.resetValue();
    responseCampaign.resetValue();
}

const gotoCampaign = () => {
    const to = responseCampaign.campaignAddress;
    refreshPage();
    router.push(`/detail-view/${to}`);
}

provide('newCampaign', newCampaign);

provide('responseCampaign', responseCampaign);
</script>