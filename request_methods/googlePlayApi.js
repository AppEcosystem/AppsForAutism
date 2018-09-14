const GPS = require('google-play-scraper');
const request = require('request');

class googlePlayScraper {
	constructor() {
		
	}

	getById(id) {
		return new Promise((resolve, reject) => {
			GPS.app({appId: id}).then( (app)=> {
				return resolve(app);
				console.log('this should never run');
			}).catch( (e) => {
				return reject(e);
			});
		});
	}

	getByTerm(term) {
		return new Promise((resolve, reject)=> {
			GPS.search({
				term: term,
				num: 250,
				fullDetail: true,
				throttle: 3
			}).then((apps) => {
				return resolve(apps);
			}).catch((e) => {
				return reject(e);
			})
		})
	}
}

var gp = new googlePlayScraper;

// GPS.suggest({term: 'autism'}).then(console.log);

// gp.getByTerm('autism games').then(console.log);

// gp.getById('com.avazapp.autism').then( (data) => {
// 	console.log(data);
// }).catch( (err) => {
// 	console.log(err);
// });


module.exports = googlePlayScraper;