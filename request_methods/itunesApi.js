var request = require('request');
var dbMethods = require('./dbMethods.js');

const ITUNES_API_ID = "https://itunes.apple.com/lookup?";
const ITUNES_API_CATEGORY = "https://itunes.apple.com/search?";

var reqs = {
	getById: (id) => {
		request.get(ITUNES_API_ID + 'id=' + id, function(error, response, body) {
			var data = JSON.parse(body);
			console.log(data.results[0]);
			return data.results[0];
		});
	},

	getByCategory: (res) => {
		request.get(ITUNES_API_CATEGORY + 'entity=software&term=autism&limit=200', function(error, response, body) {
			var data = JSON.parse(body);
			console.log(body);
			res.json(data.results);
		});
	}
};

module.exports = reqs;