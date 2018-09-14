var express 		= require('express');
var router 			= express.Router();
var requestMethods 	= require('../request_methods/itunesApi.js');
var knex = require('../db/knex.js');

router.get('/all/apple', (req, res) => {
	knex.select('id', 'app_name', 'description', 'icon', 'release_date', 'primary_genre').from('app_table').then( (data) => {
		data = appleObjConverter(data)
		res.json(data);
	});
});

router.get('/all/android', (req, res) => {
	knex.select('id', 'title', 'summary', 'icon', 'updated', 'genre').orderBy('title', 'desc').from('app_table_gplay').then( (data) => {
		res.json(data);
	});
});


router.get('/recently_updated', (req, res) => {
	knex('app_table').orderBy('current_version_release_date', 'desc').limit(5).then( (data) => {
		res.json(data);
	})
});

router.get('/recently_released', (req, res) => {
	knex.select('id', 'app_name', 'description', 'icon', 'release_date').from('app_table').orderBy('release_date', 'desc').limit(5).then( (data) => {
		res.json(data);
	})
})

router.get('/recently_released_android', (req, res) => {
	knex.select('id', 'title', 'description', 'updated', 'icon').from('app_table_gplay').orderBy('updated', 'desc').limit(5).then( (data) => {
		res.json(data);
	});
})

router.get('/ftsAndroid/:query', function(req, res) {
	knex('app_table_gplay').whereRaw("to_tsvector(description) @@ plainto_tsquery(?)", [req.params.query]).then((data) => {
		res.json(data)
	})
})

router.get('/ftsApple/:query', function(req, res) {
	knex('app_table').whereRaw("to_tsvector(description) @@ plainto_tsquery(?)", [req.params.query]).then((data) => {
		let apple = appleObjConverter(data)
		res.json(apple);
	})
})

router.get('/search/:id', (req, res) => {
	knex('app_table').where(req.params).then((data) => {
		res.json(data[0]);
	})
})

router.get('/search/android/:id', (req, res) => {
	knex('app_table_gplay').where(req.params).then( (data) => {
		res.json(data[0]);
	})
})

router.get('/apple_categories', (req, res) => {
	var genresObj = {};

	knex('categories_table').orderBy('amount', 'desc').then( (data) => {
		var genres = [];
		for(var item in data){
			genres.push(new Genre(data[item].category, 0));
		}
		// console.log(genres);
		res.json(genres)
	})
});

router.get('/android_categories', (req, res) => {
	let genres = [];
	knex('android_categories').orderBy('amount', 'desc').then( (data) => {
		for(var item in data) {
			genres.push(new Genre(data[item].category, 0));
		}
		res.json(genres);
	});
});

class Genre {
	constructor(genre, amount) {
		this.genre = genre;
		this.amount = amount;
		this.selected = false;
	}
}

function appleObjConverter(appleObjs) {
	for(var i in appleObjs) {
		appleObjs[i] = new AppleApp(appleObjs[i].app_name, appleObjs[i].description, appleObjs[i].icon, appleObjs[i].release_date, appleObjs[i].primary_genre, appleObjs[i].id);
	}
	return appleObjs;
}

class AppleApp {
	constructor(app_name, description, icon, release_date, primary_genre, id) {
		this.title = app_name;
		this.summary = description;
		this.icon = icon;
		this.release_date = release_date;
		this.genre = primary_genre;
		this.id = id;
	}
}

router.get('/test', (req, res) => {
	var data = requestMethods.getByCategory(res);
})

module.exports = router;


