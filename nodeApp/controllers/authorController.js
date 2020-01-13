const contract = require('../middleware/contractMware');

exports.setAuthor = async (req, res) => {
	console.log(req.body);
	var name = req.body.name;
	var id = req.body.id;
	var country = req.body.country;
	let response = await contract.regAuthor(name, id, country);
	res.status(200).send(`Author ${name} has been added \n TrasactionHash is ${response.transactionHash}`);
};

exports.getAuthBooks = async (req, res) => {
	let author = req.body.author
	let response = await contract.allBooksPublished();
	let resFiltered = resFilter(response, author)
	res.status(200).send(resFiltered);
};
exports.allPublishedBooks = async (req, res) => {
	let response = await contract.allBooksPublished();
	res.status(200).send(response);
};
exports.publishBook = async (req, res) => {
	var title = req.body.title;
	var isbn = req.body.isbn;
	var price = req.body.price;
	var auth_id = req.body.author_id;
	let response = await contract.pBook(title, isbn, price, auth_id);
	res.status(200).send(response);
};
function resFilter(res, author) {
	var resArray = [];
	let i = 0;
	let l = (Object.keys(res).length)
	for (i; i < l; i++) {
		if (res[i].author == author) {
			resArray.push(res[i])
		}
	}
	return resArray;
}