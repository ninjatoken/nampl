const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = "strike exact west notice program brother dance game gasp smart tragic token";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/39943029b116455f9250ee54da86df71`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/39943029b116455f9250ee54da86df71` ),
      network_id: 5,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },  
  },
  compilers: {
    solc: {
      version: '0.4.24',
      settings: {
        optimizer: {
          enabled: false
        }
      }
    }
  },
  mocha: {
    enableTimeouts: false
  }
};
