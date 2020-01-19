const contract = require('../middleware/contractMware');

exports.setReader = async (req, res) => {
    console.log(req.body);
    var name = req.body.name;
    var id = req.body.id;
    let response = await contract.regReader(name, id);
    res.status(200).send(`Reader ${name} registered \n TrasactionHash is ${response.transactionHash}`);
};

exports.getReaderBooks = async (req, res) => {
    let rname = req.body.reader
    let response = await contract.allBooksPurchased();
    let resFiltered = resFilter(response, rname)
    res.status(200).send(resFiltered);
};
exports.allPurchasedBooks = async (req, res) => {
    // transactions
    let response = await contract.allBooksPurchased();

    res.status(200).send(response);
};

exports.purchaseBook = async (req, res) => {
    var title = req.body.title;
    var readerID = req.body.readerID;
    let response = await contract.purchaseBook(title, readerID);
    res.status(200).send(response);
};
function resFilter(res, rname) {
    var resArray = [];
    let i = 0;
    let l = (Object.keys(res).length);
    for (i; i < l; i++) {
        if (res[i].reader == rname) {
            resArray.push(res[i])
        }
    }
    return resArray;
}
exports.getReaderById = async (req, res) => {
	let id = req.body.readerID;
	let response = await contract.getReader(id);
    res.status(200).send(response);
};
exports.resell = async (req, res) => {
	var title = req.body.title;
	var reader = req.body.reader;
	var prevOwner = req.body.sellerID;
	var newOwner = req.body.buyerID;
	let response = await contract.resell(title, reader, prevOwner, newOwner);
	res.status(200).send(`Book Resold with 10% price depreciation \n Transaction hash is${response.transactionHash}`);
};