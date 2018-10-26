var Token = artifacts.require("./Token.sol");

module.exports = function(deployer) {
    deployer.deploy(Token, "Some coin", "SMCN", 18)
}