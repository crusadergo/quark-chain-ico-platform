const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const QuarkChain = require('quarkchain-web3');
const Web3 = require('web3');

const web3 = new Web3();
QuarkChain.injectWeb3(web3, 'http://jrpc.testnet.quarkchain.io:38391')

// Needed in nodejs environment, otherwise would require MetaMask.
web3.qkc.setPrivateKey('0x0000000000000000000000000000000000000000000000000000000000000001');

console.log('eth address', web3.qkc.address);

const qkcAddress = QuarkChain.getQkcAddressFromEthAddress(web3.qkc.address);

const nonce = web3.qkc.getTransactionCount(qkcAddress);

console.log('nonce', nonce);

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/form.html');
});

app.post('/data', function (req, res) {
  //Данные с формы req.body хэш
  console.log(req.body);
  //Отображение адреса смарт контракта
  res.send('Тут будет адрес смарт контракта')
});
