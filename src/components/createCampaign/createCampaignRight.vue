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
                    <input :value="newCampaign.requiredAmount" min="0"
                        @input="newCampaign.requiredAmount = Math.abs($event.target.value)" type="number"
                        id="required_amount" name="required_amount" placeholder="Enter required amount..."
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
                    <div v-if="!isIpfsUploaded" class="flex justify-center items-center">
                        <VueSpinnerIos v-if="isIpfsUploading" size="35" color="black" />
                        <span v-else>Upload Image to IPFS</span>
                    </div>
                    <div v-else class="hover:cursor-no-drop flex justify-center items-center">
                        File Uploaded Successfully
                    </div>
                </button>

                <button v-if="isIpfsUploaded" @click="createNewCampaign"
                    class="hover:cursor-pointer w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% opacity-40 hover:opacity-100 text-lightText dark:text-darkText font-semibold text-lg py-3 rounded-2xl transition-all duration-300">
                    <div class="flex justify-center items-center">
                        Create Campaign
                    </div>
                </button>
                <button v-else @click="toaster('warning', 'Please upload story and image to IPFS first')"
                    class="hover:cursor-pointer w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% opacity-40 hover:opacity-100 text-lightText dark:text-darkText font-semibold text-lg py-3 rounded-2xl transition-all duration-300">
                    <div class="flex justify-center items-center">
                        Create Campaign
                    </div>
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
import toaster from '@/components/toaster/toaster.js';
import { VueSpinnerIos } from 'vue3-spinners';
import { AshaContract } from '@/utils/contractInteraction';

const categories = inject('categories');

const newCampaign = inject('newCampaign');
const responseCampaign = inject('responseCampaign');
const contract = new AshaContract();

const selectedFile = ref(null);
const formatedFileName = ref('');

const isIpfsUploading = ref(false);
const isIpfsUploaded = ref(false);

const changeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        formatedFileName.value = `${file.name.slice(0, 16)}...${file.name.slice(-4)}`;
    }
};


const handleIPFS = async () => {

    if (!(newCampaign.story && selectedFile.value)) {
        toaster('error', 'Please select a file/image first and type story');
        return;
    }
    isIpfsUploading.value = true;
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
        isIpfsUploading.value = false;
        isIpfsUploaded.value = true;
        newCampaign.storyCid = response.data.responseStory.cid;
        newCampaign.imageCid = response.data.responseImage.cid;
    } catch (err) {
        isIpfsUploading.value = false;
        isIpfsUploaded.value = false;
        console.error('Upload failed:', err);
        toaster('error', err.message, 2000);
    }

};

const createNewCampaign = async () => {
    if (newCampaign.title === '') {
        toaster('error', 'Enter title please', 2000);
    }
    else if (newCampaign.requiredAmount === '') {
        toaster('error', 'Enter required amount please', 2000);
    }
    else if (newCampaign.imageCid === '') {
        toaster('error', 'Image CID is not found', 2000);
    }
    else if (newCampaign.storyCid === '') {
        toaster('error', 'Story CID is not found', 2000);
    }
    else if (newCampaign.category === '') {
        toaster('error', 'Select correct category', 2000);
    }
    newCampaign.loading = true;

    const response = await contract.createCampaign(newCampaign.title, newCampaign.requiredAmount, newCampaign.imageCid, newCampaign.category, newCampaign.storyCid);
    newCampaign.loading = false;
    if (response.success) {
        responseCampaign.hash = response.hash;
        toaster('success', response.message, 2000);
    } else {
        toaster('error', response.message, 2000);
    }

    newCampaign.resetValue();
}


</script>