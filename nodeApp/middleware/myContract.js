//### Contract Middleware to provide Web3 functionalities ###
const Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
const fs = require('fs');

//ABI file contains complete contract in JSON form.
const contractABI = JSON.parse(fs.readFileSync('../build/contracts/Mycontract.json', 'utf8'));
const contractAddress = contractABI.networks['5777'].address;
var globe;
module.exports = { globe, contractAddress };

var contract = new web3.eth.Contract(contractABI.abi, contractAddress);
var defaultAccount = '';

web3.eth.getAccounts().then(function(accounts) {
	defaultAccount = accounts[1];
	//console.log(defaultAccount);
});

module.exports.setUser = async (fname, lname, email) => {
	// sending Transactions
	let hash = await contract.methods.setUser(fname, lname, email).send({ from: defaultAccount, gas: 1000000 });
	//res.status(200).send(`transaction hash is ${hash}`);
	return hash;
};
module.exports.getUser = async mail => {
	//get user by email
	let result = await contract.methods.getUser(mail).call();
	return result;
};
module.exports.allUsers = async () => {
	let result = await contract.methods.allUsers().call();
	return result;
};
