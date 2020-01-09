const myContract = require('../middleware/myContract');

exports.setter = async (req, res) => {
	console.log(req.body);
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;
	let response = await myContract.setUser(fname, lname, email);
	console.log(response);
	res.status(200).send(`TrasactionHash is ${response.transactionHash}`);
};

exports.getter = async (req, res) => {
	var mail = req.query.mail;
	console.log(`api called`);
	// transactions
	let response = await myContract.getUser(mail);
	console.log(response);
	res.status(200).send(response);
};

exports.getall = async (req, res) => {
	let response = await myContract.allUsers();
	console.log(response);
	res.status(200).send(response);
};
