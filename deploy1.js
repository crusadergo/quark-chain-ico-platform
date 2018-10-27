// Sample code to deploy smart contract on QuarkChain testnet using quarkchain-web3.js
// https://github.com/QuarkChain/quarkchain-web3.js
// Contract code is taken from https://testnet.quarkchain.io/contract
// The code can run in the browser console while on http://testnet.quarkchain.io/contract (not https)
// MetaMask is required to sign the transaction and you need testnet tokens in your account

const QuarkChain = require('quarkchain-web3');
const Web3 = require('web3');
const web3 = new Web3();
const fs = require('fs');
const solc = require('solc')

let source = fs.readFileSync('./contracts/ERC20Token.sol', 'utf8');
let compiledContract = solc.compile(source, 1);
// console.log(compiledContract.contracts[':Token']);
let abi = JSON.parse(compiledContract.contracts[':Token'].interface);
let bytecode = '0x' + compiledContract.contracts[':Token'].bytecode;
// console.log(typeof bytecode);



// Use http://localhost:38391 to deploy contract on a local cluster
var testnetEndpoint = "http://jrpc.testnet.quarkchain.io:38391";
const PRIVATEKEY = '0x026D813864F0F79AE8C5448C51FE01580DABED47DE5761C32DFA09659A6DFC4E'
const myEth = '0x4875913b69bf2802867e7F60e163582833811B2e48bF7f28'

// web3 object comes from MetaMask
QuarkChain.injectWeb3(web3, testnetEndpoint);
web3.qkc.setPrivateKey(PRIVATEKEY);

function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms) { }
}

// var balance = web3.qkc.getBalance(myEth);
// const txid = '0x0b2bcb054f707cf86a2cf0d245823b6cd896400b127ba7dcaa2f3a613a6544ab48bf7f28'
// const contractAddress = web3.qkc.getTransactionReceipt(txid);
// console.log(contractAddress);
// throw new Error("Something went badly wrong!");

let txId;

var contractClass = web3.qkc.contract(abi);
var contractInstance = contractClass.new('Some coin', 'SMCN', 18, { data: bytecode, from: myEth, gas: 1000000 }, function (err, contract) {
  console.log('cotract', contract);
  sleep(10000);
  // (web3.eth.getTransactionReceipt(contract.transactionId, (err, contr) => {sleep(10000); console.log(contr)}));
  // (web3.eth.getTransactionReceipt(contract.transactionId, (err, contr) => {console.log(contr)}));

  if (!err) {
    // NOTE: The callback will fire twice!
    // Once the contract has the transactionId property set and once its deployed on an address.

    // e.g. check tx hash on the first call (transaction send)
    if (!contract.address) {
     (web3.eth.getTransactionReceipt(contract.transactionId, (err, contr) => {sleep(15000); console.log(contr)}));
      console.log('no address', contract.transactionId); // The id of the transaction, which deploys the contract
      // console.log('contract', contractAddress);
      // const contr = web3.qkc.getTransactionReceipt(contract.transactionId)
      // console.log(contr);

      // check address on the second call (contract deployed)
    } else {
      console.log('all good', contract.address); // the contract address
    }

    // Note that the returned "contractInstance" === "contract",
    // so the returned "contractInstance" object will also get the address set.
    // const contractAddress = await web3.qkc.getTransactionReceipt(contract.transactionId);
    // await console.log(contractAddress);

  }
});

// sleep(5000);
// console.log(contractInstance._eth.accounts);
// function deploy(name, symbol, decimal) {
//   const txId = contractClass.new(name, symbol, decimal, { data: bytecode, from: myEth, gas: 1000000 }, (err, contract) => {
//     if (!err) {
//       console.log('contract', contract);
//       // console.log(contr.contractAddress);
//     }
//   })
// }

// deploy('Some coin', 'SMCN', 18);
// console.log('contract instance', contractInstance);
// console.log(contractInstance.transactionId);