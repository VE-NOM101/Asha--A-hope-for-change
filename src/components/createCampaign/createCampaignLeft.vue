<template>
    <div class="w-full max-w-3xl mx-auto px-4 py-6">
        <div class="space-y-6">
            <!-- Campaign Title -->
            <div class="space-y-2">
                <label for="required_amount"
                    class="block text-lg md:text-xl font-medium text-lightText dark:text-darkText">
                    Campaign Title
                </label>
                <input type="text" v-model="newCampaign.title" name="campaign_title"
                    placeholder="Enter your campaign title..."
                    class="w-full bg-white dark:bg-darkSecondary text-lightText dark:text-darkText dark:placeholder-gray-400 text-md md:text-lg px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300" />
            </div>

            <!-- Story -->
            <div class="space-y-2">
                <label for="required_amount"
                    class="block text-lg md:text-xl font-medium text-lightText dark:text-darkText">
                    Story
                </label>
                <textarea v-model="newCampaign.story" name="campaign_story" rows="6"
                    placeholder="Tell your campaign story..."
                    class="w-full bg-white dark:bg-darkSecondary text-lightText dark:text-darkText dark:placeholder-gray-400 text-md md:text-lg px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400  resize-y"></textarea>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'
const newCampaign = inject('newCampaign');
</script>