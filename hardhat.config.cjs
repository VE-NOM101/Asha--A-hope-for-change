require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config() // Load .env variables

task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()
  console.log(accounts)
  for (const account of accounts) {
    const address = await account.getAddress()
    const balance = await ethers.provider.getBalance(address)
    const formattedBalance = ethers.formatEther(balance) // ✅ Fixed here
    console.log(`${address}: ${formattedBalance} ETH`)
  }
})

task('chainid', 'Prints the current chain ID', async () => {
  const network = await ethers.provider.getNetwork()
  console.log(`Chain ID: ${network.chainId}`)
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.28',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    // sepolia: {
    //   url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    //   accounts: [process.env.PRIVATE_ACCOUNT_KEY1],
    // }
  },
}
