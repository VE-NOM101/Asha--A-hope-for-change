<template>
    <div class="w-full md:w-1/2 flex flex-col gap-4 text-white">
        <!-- Campaign Title -->
        <h1 class="text-2xl font-bold font-special dark:text-darkText text-lightText">Need Funds for surgery</h1>

        <!-- Donation Input and Button -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <input type="number" placeholder="Enter Amount To Donate(ETH)"
                class="dark:bg-darkSecondary bg-white dark:text-darkText text-lightText p-4 rounded-lg w-full md:w-1/2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:dark:ring-indigo-400" />
            <button
                class="flex justify-center items-center dark:text-darkText text-lightText bg-gradient-to-r text-lg from-purple-500 to-indigo-500 hover:dark:shadow-(--cyanShadow) hover:shadow-(--purpleShadow) hover:-translate-x-1.5   font-bold py-4 px-8 rounded-lg transition-all duration-300 w-full md:w-auto">
                <BxDonateBlood /> Donate
            </button>
        </div>

        <!-- Required and Received Amount -->
        <div class="flex flex-col md:flex-row gap-4">
            <div class="dark:bg-darkSecondary bg-white p-4 rounded-lg flex-1 text-center">
                <p class="text-gray-400">Required Amount</p>
                <p class="text-xl font-bold text-lightText dark:text-darkText">1000.0 ETH</p>
            </div>
            <div class="dark:bg-darkSecondary bg-white p-4 rounded-lg flex-1 text-center">
                <p class="text-gray-400">Received Amount</p>
                <p class="text-xl font-bold text-lightText dark:text-darkText">0.0 ETH</p>
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
</script>