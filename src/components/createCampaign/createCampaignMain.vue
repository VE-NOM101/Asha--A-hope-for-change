<template>
    <div class="mb-12 flex px-4 max-w-[1200px] mx-auto mt-[100px] justify-center items-baseline">
        <CreateCampaignLeft />
        <CreateCampaignRight />
    </div>
</template>

<script setup>
import CreateCampaignLeft from './createCampaignLeft.vue';
import CreateCampaignRight from './createCampaignRight.vue';

import { provide, reactive } from 'vue'

const newCampaign = reactive({
    title: '',
    story: '',
    requiredAmount: '',
    category: 'Education',
    imageCid: '',
    storyCid: ''
})

provide('newCampaign', newCampaign)

</script>