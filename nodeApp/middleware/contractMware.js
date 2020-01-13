//### Contract Middleware to provide Web3 functionalities ###
const Web3 = require('web3');
var web3 = new Web3('http://localhost:7545');
const fs = require('fs');

//ABI file contains complete contract in JSON form.
const contractABI = JSON.parse(fs.readFileSync('../build/contracts/digitalMarket.json', 'utf8'));
const contractAddress = contractABI.networks['5777'].address;
var globe;
module.exports = { globe, contractAddress };

var contract = new web3.eth.Contract(contractABI.abi, contractAddress);
var defaultAccount = '';

web3.eth.getAccounts().then(function(accounts) {
	defaultAccount = accounts[1];
	console.log(defaultAccount);
});

module.exports.regAuthor = async (name, id, country) => {
	// sending Transactions
	let hash = await contract.methods.registerAuthor(name, id, country).send({ from: defaultAccount, gas: 1000000 });
	//res.status(200).send(`transaction hash is ${hash}`);
	return hash;
};
module.exports.pBook = async (title, isbn, price, auth_id) => {
	//get user by email
	let result = await contract.methods.publishBook(title, isbn, price, auth_id).send({ from: defaultAccount, gas: 1000000 });
	return result;
};
module.exports.allBooksPublished = async () => {
	let result = await contract.methods.getAuthorBooks().call();
	return result;
};
module.exports.regReader = async (name , id) => {
	let result = await contract.methods.registerReader(name , id).send({ from: defaultAccount, gas: 1000000 });
	return result
};
module.exports.allBooksPurchased = async () => {
	let result = await contract.methods.getReaderBooks().call();
	return result;
};
module.exports.purchaseBook = async (title , readerID) => {
	let result = await contract.methods.purchaseBook(title , readerID).send({ from: defaultAccount, gas: 1000000 });
	return result;
};