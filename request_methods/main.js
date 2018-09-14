const googlePlayScraper = require('./googlePlayApi.js');
const dbMethods = require('./dbMethods.js');
const fs = require('fs');
var GP = new googlePlayScraper;


// var lineReader = require('readline').createInterface({
//   input: require('fs').createReadStream('./androidIDsV1.txt')
// });

// var time = 1000;
// var count = 0;
// lineReader.on('line', function (line) {
// 	setTimeout(() => {
// 		let app;
// 		GP.getById(line).then( (data)=> {
// 			dbMethods.insertInto(data);
// 			app = data
// 		}).then(()=> {
// 			console.log('done adding: ' + app.title);
// 		}).catch((e) => {
// 			console.log(e);
// 		})
// 		count += 1
// 		console.log(count);
// 	}, time += 1500);
// });

// GP.getByTerm('autism Applied Behavior Analysis').then( (data) => {
// 	for(var i in data) {
// 		dbMethods.insertInto(data[i]);
// 		console.log(data[i].title);
// 	}
// });


