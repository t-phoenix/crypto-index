require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCSCAN_API_KEY
    }
  },
  // bscscan: {
  //   apiKey: process.env.BSCSCAN_API_KEY
  // },
  solidity: {
    version: "0.6.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000
      }
    }
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      //forking matic testnet 
      forking: {
        enabled: true,
        url: "https://polygon-rpc.com",
        // blockNumber: 56802667,
        // url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
        chainId: 97
      },
    },
    bscTestnet: {
      // url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      url: "https://go.getblock.io/213b9fb34989438991dce4f8831e6679",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY11,process.env.PRIVATE_KEY10, process.env.PRIVATE_KEY9]
    },
    mainnet: {
      url: "https://bsc-dataseed.bnbchain.org/",
      chainId: 56,
      gasPrice: 20000000000,
      
    },
    ganache: {
      url: "http://127.0.0.1:7545",

    },
    goerli:{
      url: 'https://ethereum-goerli.publicnode.com',
      // accounts: [process.env.PRIVATE_KEY1, process.env.PRIVATE_KEY7, process.env.PRIVATE_KEY8 ]
    },
    polygon: {
      url: 'https://polygon-rpc.com',
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      // accounts: [process.env.PRIVATE_KEY1, process.env.PRIVATE_KEY7, process.env.PRIVATE_KEY8 ]

    }
    
  },
};
