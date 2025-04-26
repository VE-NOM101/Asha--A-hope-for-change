import { ethers } from 'ethers'

const { ethereum } = window
// Network config
const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`, //
    chainName: 'Ethereum Sepolia Testnet',
    nativeCurrency: {
      name: 'SepoliaETH',
      symbol: 'SepoliaETH',
      decimals: 18,
    },
    rpcUrls: [import.meta.env.VITE_RPC_URL], // include full URL
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
}

export const connectWallet = async () => {
  if (!window.ethereum) {
    alert('Please install MetaMask!')
    return
  }
  await ethereum.request({ method: 'eth_requestAccounts' })

  const provider = new ethers.BrowserProvider(ethereum)
  const network = await provider.getNetwork()
  if (network.chainId !== 11155111n) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${Number(11155111).toString(16)}` }],
      })
    } catch (switchError) {
      // This error means the network isn't added, so we try to add it
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networks.sepolia],
          })
        } catch (addError) {
          console.error('Add chain error:', addError)
        }
      } else {
        console.error('Switch error:', switchError)
      }
    }
  }

  const signer = await provider.getSigner()
  const address = await signer.getAddress()
  const balance = await provider.getBalance(address)

  return { address: address, balance: balance }
}
