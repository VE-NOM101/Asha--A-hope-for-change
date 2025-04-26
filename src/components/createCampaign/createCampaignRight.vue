<template>
    <div class="w-full max-w-3xl mx-auto px-4 py-6">
        <div class="space-y-6">

            <!-- Required Amount & Category -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Required Amount -->
                <div class="space-y-2">
                    <label for="required_amount"
                        class="block text-lg md:text-xl font-medium text-lightText dark:text-darkText">
                        Required Amount (ETH)
                    </label>
                    <input v-model="newCampaign.requiredAmount" type="number" id="required_amount"
                        name="required_amount" placeholder="Enter required amount..."
                        class="w-full bg-white dark:bg-darkSecondary text-lightText dark:text-darkText dark:placeholder-gray-400 text-base md:text-lg px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300" />
                </div>

                <!-- Category -->
                <div class="space-y-2">
                    <label for="category"
                        class="block text-lg md:text-xl font-medium text-lightText dark:text-darkText">
                        Select Category
                    </label>
                    <select v-model="newCampaign.category" id="category" name="category"
                        class="w-full bg-white dark:bg-darkSecondary text-lightText dark:text-darkText text-base md:text-lg px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300">
                        <option v-for="(item, index) in categories" :key="index" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>

            </div>

            <!-- Campaign Image Upload (Native-style Look) -->
            <div class="space-y-2">
                <label for="campaign_image"
                    class="block text-lg md:text-xl font-medium text-lightText dark:text-darkText">
                    Select Image
                </label>

                <div
                    class="flex items-center justify-between bg-white dark:bg-darkSecondary text-lg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-4 w-full">


                    <label for="campaign_image"
                        class="flex justify-center items-center font-semibold text-black dark:text-white cursor-pointer">
                        <BxImageAdd /> Choose File
                    </label>
                    <!-- File Name Display -->
                    <span class="text-gray-500 dark:text-gray-400 truncate">
                        {{ formatedFileName || 'No file chosen' }}
                    </span>
                </div>

                <!-- Hidden Real Input -->
                <input type="file" id="campaign_image" name="campaign_image" accept="image/*" @change="changeHandler"
                    class="hidden" />
            </div>

            <!-- Buttons -->
            <div class="space-y-2">
                <button @click="handleIPFS"
                    class="hover:cursor-pointer w-full bg-gradient-to-r from-pink-500 from-10% via-purple-500 via-30% to-indigo-500 to-90% opacity-40 hover:opacity-100 text-lightText dark:text-darkText font-semibold text-lg py-3 rounded-2xl transition-all duration-300">
                    Upload Image to IPFS

                </button>
                <button
                    class="hover:cursor-pointer w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% opacity-40 hover:opacity-100 text-lightText dark:text-darkText font-semibold text-lg py-3 rounded-2xl transition-all duration-300">
                    Create Campaign
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { inject } from 'vue';
import { BxImageAdd } from '@kalimahapps/vue-icons';
import axios from 'axios';
import toaster from '@/components/toaster/toaster.js'

const categories = ['Education', 'Health', 'Animal', 'Pendamic', 'Refugee'];

const newCampaign = inject('newCampaign');

const selectedFile = ref(null);
const formatedFileName = ref('');

const changeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        formatedFileName.value = `${file.name.slice(0, 16)}...${file.name.slice(-4)}`;
    }
};

const handleIPFS = async () => {

    if (!(newCampaign.story && selectedFile.value)) {
        toaster('error', 'Please select a file//image first and type story');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('story', newCampaign.story)

    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/upload-pinata`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        toaster('success', 'Story and Image uploaded to IPFS successfully', 2000);
        newCampaign.storyCid = response.data.responseStory.cid;
        newCampaign.imageCid = response.data.responseImage.cid;
    } catch (err) {
        console.error('Upload failed:', err);
        toaster('error', err.message, 2000);
    }
};


</script>