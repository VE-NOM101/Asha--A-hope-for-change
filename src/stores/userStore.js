import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userAddress = ref(null)
  const mode = ref(localStorage.getItem('mode') || 'dark')
  function setUserAddress(newUserAddress) {
    userAddress.value = newUserAddress
  }

  function setMode(newMode) {
    localStorage.setItem('mode', newMode)
    mode.value = newMode
  }

  return {
    mode,
    setMode,
    userAddress,
    setUserAddress,
  }
})
