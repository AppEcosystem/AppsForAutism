const pg = require('pg');
const itunesApi = require('./itunesApi');
const request = require('request');

const ITUNES_API_ID = "https://itunes.apple.com/lookup?";
const ITUNES_API_CATEGORY = "https://itunes.apple.com/search?";
const path = require('path');
const knex = require('../db/knex.js');

var reqs = {
	getById: (id) => {
		request.get(ITUNES_API_ID + 'id=' + id, function(error, response, body) {
			var data = JSON.parse(body);
			// console.log(data.results[0]);
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


var dbMethods = {
	getIDsFromAppInfo() {
		var results = [];
		var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/PrioriData';
		console.log('here');

		var client = new pg.Client(connectionString);
		client.connect();

		var query = client.query('SELECT app_id FROM finaltable;')
		.then(res => results = res.rows).then( () => { 
			client.end();
			for(let i in results) {
				setTimeout( () => {
					request.get(ITUNES_API_ID + 'id=' + results[i].app_id, function(error, response, body) {
						var data = JSON.parse(body);
						dbMethods.insertInto(data);
					});
				}, 4000 * i)
			}
		});
	},

	insertInto(data){
		knex('app_table_gplay').insert(data).then((data) => {}).catch((err)=> { console.log(err); });
	}
}

module.exports = dbMethods; 
