const async = require('async');
const axios = require('axios');
const { BASE_URL } = require('./config');

const fireRequest = () => {
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
	})
	.catch(err => {
		console.log('err: ', err);
	});
}

async.parallel([
	function (callback) {
		fireRequest().then(res => {
			callback(null, res.data.shortUrl);
		})
	},
	function (callback) {
		fireRequest().then(res => {
			callback(null, res.data.shortUrl);
		})
	}
],
(err, results) => {
	if(err) {
		console.log('err: ', err);
	} else {
		console.log('results: ', results);
	}
})