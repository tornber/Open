require('dotenv').config();
const { MNEMONIC, INFURA_API_KEY } = process.env;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",    
     port: 7545,           
     network_id: "5777",    
     gas: 6721975,
     gasPrice: 300000000000
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${INFURA_API_KEY}`),
      network_id: 5,       // Goerli's id
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      networkCheckTimeout: 10000,
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: "0.8.17",
       optimizer: {
         enabled: false,
         runs: 200
       },
    }
  },
};
