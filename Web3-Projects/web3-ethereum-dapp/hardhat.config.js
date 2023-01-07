require('dotenv').config()
require('hardhat/config').HardhatUserConfig

const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");


task('accounts',"prints the list of accounts",async (taskArgs,hre) => {
  const accounts = await hre.ethers.getSigners()

  for(const account of accounts) {
    console.log(account.address)
  }
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.STAGING_QUICKNODE_KEY, 
      accounts: [process.env.PRIVATE_KEY],
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
}