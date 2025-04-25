<template>
    <input class="bg-darkSecondary p-4 border-2" type="file" @change="changeHandler" />
    <input class="bg-darkSecondary p-4 border-2" type="text" v-model="story" />
    <button class="p-2 bg-amber-300 rounded-4xl" @click="handleSubmission">Upload</button>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const selectedFile = ref(null);
const story = ref('');
const changeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
    }
};

const handleSubmission = async () => {
    if (!selectedFile.value && !story.value) {
        alert('Please select a file first and type story');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('story', story.value)

    try {
        const response = await axios.post('http://localhost:3000/upload-pinata', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Uploaded:', response.data);
        alert('Upload successful! CID(s): ' + JSON.stringify(response.data));
    } catch (err) {
        console.error('Upload failed:', err);
        alert('Upload failed: ' + err.message);
    }
};
</script>