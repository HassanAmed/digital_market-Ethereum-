//web3
var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
app.use('/api', routes);

module.exports = app;
