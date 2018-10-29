const QuarkChain = require('quarkchain-web3');
const Web3 = require('web3');
const web3 = new Web3();
const fs = require('fs');
const solc = require('solc');

let source = fs.readFileSync('./contracts/ERC20Token.sol', 'utf8');
let compiledContract = solc.compile(source, 1);
let abi = JSON.parse(compiledContract.contracts[':Token'].interface);
let bytecode = '0x' + compiledContract.contracts[':Token'].bytecode;

var testnetEndpoint = "http://jrpc.testnet.quarkchain.io:38391";
const PRIVATEKEY = '0x9B5257420EE9DA219943E6276543A5FC79232F143916DFBC7218EAF012FF3427'
const myEth = '0x86eaBC2DBEcbf202F76b1868225c3Fb94B67e83986cb18b9'

QuarkChain.injectWeb3(web3, testnetEndpoint);
web3.qkc.setPrivateKey(PRIVATEKEY);

var contractClass = web3.qkc.contract(abi);

function deploy(name, symbol, decimal) {
  return new Promise((resolve, reject) => {
    return contractClass.new(name, symbol, decimal, { data: bytecode, from: myEth, gas: 1000000 }, (err, contract) => {
      resolve(contract);
    })
  });
};

function receipt(txId) {
  return new Promise((resolve, reject) => {
    return web3.qkc.getTransactionReceipt(txId, (err, contract) => {
      resolve(contract);
    });
  })
};
