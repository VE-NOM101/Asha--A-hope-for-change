async function main() {
  const [deployer] = await ethers.getSigners()

  const Token = await ethers.getContractFactory('CampaignFactory')
  const token = await Token.deploy()

  await token.waitForDeployment()
  console.log('Contract address: %s, Deployed by: %s', token.target, deployer.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
