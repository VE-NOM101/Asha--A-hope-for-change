import { ethers } from 'ethers'
import CampaignFactory from '@/abi/Campaign.sol/CampaignFactory.json'

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
        ethers.parseEther(requiredFund), // uint requiredCampaignFund
        imageCid, // string memory imgURL
        category, // string memory category
        storyCid, // string memory storyURL
      )

      console.log('⏳ Transaction sent:', tx.hash)
      await tx.wait()
      return { success: true, message: 'Campaign Created Successfully', hash: tx.hash }
    } catch (error) {
      console.log(error.message)
      return { success: false, message: '❌ Transaction rejected by user.' }
    }
  }

  async getAllCampaign() {
    const events = await this.ContractData.queryFilter('campaignCreated')
    const filtered_events = events.reverse()
    const formated_events = filtered_events.map((e) => {
      return {
        title: e.args.title,
        imageCid: e.args.imgURL,
        date: parseInt(e.args.timestamp),
        owner: e.args.owner,
        amount: ethers.formatEther(e.args.requiredFund),
      }
    })
    return formated_events
  }

  async getFormatedData(filter) {
    const events = await this.ContractData.queryFilter(filter)
    const filtered_events = events.reverse()
    const formated_events = filtered_events.map((e) => {
      return {
        title: e.args.title,
        imageCid: e.args.imgURL,
        date: parseInt(e.args.timestamp),
        owner: e.args.owner,
        amount: ethers.formatEther(e.args.requiredFund),
      }
    })
    return formated_events
  }
  async getEducationCampaign() {
    const filter = this.ContractData.filters.campaignCreated(
      null,
      null,
      null,
      null,
      null,
      null,
      'Education',
    )
    const formated_events = await this.getFormatedData(filter)
    return formated_events
  }
  async getHealthCampaign() {
    const filter = this.ContractData.filters.campaignCreated(
      null,
      null,
      null,
      null,
      null,
      null,
      'Health',
    )
    const formated_events = await this.getFormatedData(filter)
    return formated_events
  }
  async getAnimalCampaign() {
    const filter = this.ContractData.filters.campaignCreated(
      null,
      null,
      null,
      null,
      null,
      null,
      'Animal',
    )
    const formated_events = await this.getFormatedData(filter)
    return formated_events
  }
  async getPendamicCampaign() {
    const filter = this.ContractData.filters.campaignCreated(
      null,
      null,
      null,
      null,
      null,
      null,
      'Pendamic',
    )
    const formated_events = await this.getFormatedData(filter)
    return formated_events
  }

  async getRefugeeCampaign() {
    const filter = this.ContractData.filters.campaignCreated(
      null,
      null,
      null,
      null,
      null,
      null,
      'Refugee',
    )
    const formated_events = await this.getFormatedData(filter)
    return formated_events
  }
}
