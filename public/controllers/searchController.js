var app = angular.module('app-ecosystem');

let uniqueItems = function(data, key) {
	// makes genres list
	let result = new Array();
	for(let i in data){
		let value = data[i][key];

		if (result.indexOf(value) === -1) {
			result.push(value)
		}
	}
	// console.log(result);
	return result;
}

app.controller('SearchController', function($http, $scope){
    $scope.loading = true;
    $scope.pager = {};
    $scope.filter = {};
    $scope.genres = {};
    $scope.search = "";
    $scope.data = [];
	$scope.filterState = function() {
		console.log($scope.genres);
	};

	$scope.fts = (platform, search) => {
		if(platform.apple) {
			$http.get('/api/ftsApple/' + search).then( (data) => {
				$scope.data = data.data;
			})
		}

		if(platform.google) {
			$http.get('/api/ftsAndroid/' + search).then( (data) => {
				$scope.data = data.data;
			})
		}
	}

	$scope.platform = { apple: false, google: false };

	$scope.platformState = function(item) {
		$scope.platform[item] = true;
		if(item === "apple") {
			$scope.platform.google = false;
			$http.get('/api/all/apple').then(function(data){
				$scope.data = data.data;
			});
		} else if (item === "google") {
			$scope.platform.apple = false;
			$http.get('/api/all/android').then(function(data) {
				$scope.data = data.data;
			})
		}
	}

	$scope.$watch(function() {
		return {
			data: $scope.data,
			genres: $scope.genres
		}
	}, function(value) {
		let selected;

		$scope.genreGroup = uniqueItems($scope.data, 'genre');
		let filterAfterGenre = [];
		selected = false;
		for(let j in $scope.data) {
			let p = $scope.data[j];
			for(let i in $scope.genres) {
				if($scope.genres[i]){
					selected = true;
					if(i === p.genre) {
						filterAfterGenre.push(p);
						break;
					}
				}
			}
		}
		if(!selected) {
			filterAfterGenre = $scope.data;
		}

		$scope.filteredData = filterAfterGenre;
	}, true)

	// $scope.$watch('filtered', function(newValue) {
	// 	if(angular.isArray(newValue)) {
	// 		console.log(newValue.length)
	// 	}
	// }, true)
	$scope.loading = false;
});

// app.filter('groupBy', function(){
// 	return function(collection, key) {
// 		if(collection === null) {
// 			return;
// 		}
// 		return uniqueItems(collection, key)
// 	}
// })