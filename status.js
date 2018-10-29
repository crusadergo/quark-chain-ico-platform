const QuarkChain = require('quarkchain-web3');
const Web3 = require('web3');
const web3 = new Web3();

var testnetEndpoint = "http://jrpc.testnet.quarkchain.io:38391";
const PRIVATEKEY = '0x9B5257420EE9DA219943E6276543A5FC79232F143916DFBC7218EAF012FF3427'
const myEth = '0x86eaBC2DBEcbf202F76b1868225c3Fb94B67e83986cb18b9'

QuarkChain.injectWeb3(web3, testnetEndpoint);
web3.qkc.setPrivateKey(PRIVATEKEY);

// web3.qkc.getTransactionReceipt("0x055067a7194b5c5d9f5da403cc1616c405fb898c7dbe9b6ed827f95a3dc7505f86cb18b9", (err, contract) => {
//   console.log(contract);
// });
let test;

function receipt(txId) {
  return new Promise((resolve, reject) => {
    return web3.qkc.getTransactionReceipt(txId, (err, contract) => {
      resolve(contract);
    });
  })
};
receipt("0x055067a7194b5c5d9f5da403cc1616c405fb898c7dbe9b6ed827f95a3dc7505f86cb18b9").then(res => {
  console.log("res:", res);
}).catch(err => {
  console.log("error:", err);
});
// console.log(a)

// web3.qkc.getTransactionReceipt(txId, (err, contract) => {
//   return contract;
// });
// return req;
// }