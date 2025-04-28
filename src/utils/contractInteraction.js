import { ethers } from 'ethers'
import CampaignFactory from '@/abi/Campaign.sol/CampaignFactory.json'
import Campaign from '@/abi/Campaign.sol/Campaign.json'

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
        ethers.parseEther(requiredFund.toString()), // uint requiredCampaignFund
        imageCid, // string memory imgURL
        category, // string memory category
        storyCid, // string memory storyURL
      )

      console.log('⏳ Transaction sent:', tx.hash)

      // Wait for the transaction to be mined
      const receipt = await tx.wait()
      // Find the 'campaignCreated' event from the receipt
      const event = receipt.logs
        .map((log) => {
          try {
            return CampaignContractInstance.interface.parseLog(log)
          } catch {
            return null
          }
        })
        .find((parsed) => parsed && parsed.name === 'campaignCreated')
      if (!event) {
        throw new Error('campaignCreated event not found')
      }

      const campaignAddress = event.args.campaignAddress.toString() //Event param name is 'campaignAddress'
      return {
        success: true,
        message: 'Campaign Created Successfully',
        campaignAddress: campaignAddress,
      }
    } catch (error) {
      console.log(error.message)
      return { success: false, message: error.message.slice(0, 30) + '...' }
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
        campaignAddress: e.args.campaignAddress.toString(),
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
        campaignAddress: e.args.campaignAddress.toString(),
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

  async fetchCampaign(campaign_address) {
    const fetchCampaignData = new ethers.Contract(
      campaign_address,
      Campaign.abi,
      this.testnetProvider,
    )

    return {
      title: await fetchCampaignData.title(),
      requiredFund: ethers.formatEther(await fetchCampaignData.requiredFund()),
      imageCid: await fetchCampaignData.image_url(),
      storyCid: await fetchCampaignData.story_url(),
      owner: await fetchCampaignData.owner(),
      receivedFund: ethers.formatEther(await fetchCampaignData.receivedFund()),
    }
  }

  async donateToCampaign(campaign_address, amountInEther) {
    try {
      const signer = await this.browserProvider.getSigner()
      const CampaignContractInstance = new ethers.Contract(campaign_address, Campaign.abi, signer)

      const tx = await CampaignContractInstance.donate({
        value: ethers.parseEther(amountInEther.toString()),
      })
      await tx.wait()
      return { message: amountInEther + 'ETH, Donated Successfully', success: true }
    } catch (error) {
      console.log(error)
      if (error.reason && error.reason.includes('Required fund fullfilled')) {
        return { message: 'Sorry! The fund goal is already achieved.', success: false }
      } else {
        return { message: error.message.slice(0, 30) + '...', success: false }
      }
    }
  }

  async fetchRecentDonation(campaign_address) {
    const fetchRecentDonationData = new ethers.Contract(
      campaign_address,
      Campaign.abi,
      this.testnetProvider,
    )

    const donatedEvent = await fetchRecentDonationData.queryFilter('donatedEvent')
    const filtered_events = donatedEvent.reverse()
    const formated_events = filtered_events.map((e) => {
      return {
        donar: e.args.donar,
        amount: ethers.formatEther(e.args.amount),
        timestamp: parseInt(e.args.timestamp),
      }
    })
    return formated_events
  }

  async fetchMyDonation(campaign_address, my_address) {
    const fetchRecentDonationData = new ethers.Contract(
      campaign_address,
      Campaign.abi,
      this.testnetProvider,
    )
    const filter = fetchRecentDonationData.filters.donatedEvent(my_address, null, null)
    const donatedEvent = await fetchRecentDonationData.queryFilter(filter)
    const filtered_events = donatedEvent.reverse()
    const formated_events = filtered_events.map((e) => {
      return {
        donar: e.args.donar,
        amount: ethers.formatEther(e.args.amount),
        timestamp: parseInt(e.args.timestamp),
      }
    })
    return formated_events
  }
}
