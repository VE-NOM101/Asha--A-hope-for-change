import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userAddress = ref(null)
  function setUserAddress(newUserAddress) {
    userAddress.value = newUserAddress
  }

  return {
    userAddress,
    setUserAddress,
  }
})
