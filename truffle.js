var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "version option reduce sister oval want spatial shop tonight price rich mesh";

module.exports = {
    networks: {
        development: {
            network_id: "*", // Match any network id
            host: "localhost",
            port: 7545
        },
        // production: {
        //     network_id: 1,
        //     host: "35.155.169.253",
        //     port: 38291   // Different than the default below
        // },
        ropsten: {
            provider: function() {
                return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/921f185c334e4175808e14c5d1563caa")
            },
                network_id: 3
        }
    }
};