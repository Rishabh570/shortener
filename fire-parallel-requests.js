const async = require('async');
const axios = require('axios');
const { BASE_URL } = require('./config');

const shortenURL = () => {
	return axios({
		method: 'post',
		url: `http://${BASE_URL}/shorten`,
		headers: {'Content-Type': 'application/json'},
		data: {
			url: 'http://example.com',
		}
	})
	.then(data => {
		return data;
	});
}

async.parallel([
	function (callback) {
		return shortenURL().then(res => {
			callback(null, res.data.shortUrl);
		})
		.catch(err1 => {
			console.log('Error in R1: ', err1.code);
		});
	},
	function (callback) {
		return shortenURL().then(res => {
			callback(null, res.data.shortUrl);
		})
 		.catch(err2 => {
			console.log('Error in R2: ', err2.code);
		});
	},
	function (callback) {
		return shortenURL().then(res => {
			callback(null, res.data.shortUrl);
		})
		.catch(err3 => {
			console.log('Error in R3: ', err3.code);
		});
	}
],
(err, results) => {
	if(err) {
		console.log('err: ', err.message);
	} else {
		console.log('results: ', results);
	}
})