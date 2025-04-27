<template>
    <div class="relative max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-start mt-4 gap-6">
        <!-- Left Side - Image -->
        <DetailViewLeft />

        <!-- Right Side - Donation Form and Details -->
        <DetailViewRight />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import DetailViewLeft from './detailViewLeft.vue';
import DetailViewRight from './detailViewRight.vue';
</script>