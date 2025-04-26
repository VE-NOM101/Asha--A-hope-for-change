import { ethers } from 'ethers'
import CampaignFactory from '@/abi/Campaign.sol/CampaignFactory.json'
import { connectWallet } from '@/utils/connectWallet.js'

const { ethereum } = window

export class AshaContract {
  browserProvider = null
  testnetProvider = null
  ContractData = null
  contractAddress = ''
  constructor() {
    this.browserProvider = new ethers.BrowserProvider(ethereum)
    this.testnetProvider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL)
    this.contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
    //getting data from the contract,
    this.ContractData = new ethers.Contract(
      this.contractAddress,
      CampaignFactory.abi,
      this.testnetProvider,
    )
  }
  async createCampaign(title, requiredFund, imageCid, category, storyCid) {
    try {
      const signer = await this.browserProvider.getSigner()
      const CampaignContractInstance = new ethers.Contract(
        this.contractAddress,
        CampaignFactory.abi,
        signer,
      )

      // Call the createCampaign with arguments
      const tx = await CampaignContractInstance.createCampaign(
        title, // string memory campaignTitle
        parseInt(requiredFund), // uint requiredCampaignFund
        imageCid, // string memory imgURL
        category, // string memory category
        storyCid, // string memory storyURL
      )

      console.log('⏳ Transaction sent:', tx.hash)
      await tx.wait()
      return { success: true, message: 'Campaign Created Successfully', to: tx.to }
    } catch (error) {
      console.log(error.message)
      return { success: false, message: '❌ Transaction rejected by user.' }
    }
  }
}
