require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
