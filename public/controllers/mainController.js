var app = angular.module('app-ecosystem');

app.controller('MainController', function($http, $scope){
	// $http.get('/api/all').then(function(data) {
	// 	$scope.data = data.data;
	// });

	$http.get('/api/recently_released').then(function(data) {
		$scope.recent = data.data;
	})

	$http.get('/api/recently_released_android').then( (data)=> {
		$scope.recentAndroid = data.data
	})
})

app.controller('AppAppleController', function($http, $scope, $routeParams) {
	$http.get('/api/search/' + $routeParams.id).then(function(data) {
		convertAllArrays(data);
		$scope.data = data.data;
	});
});


function convertAllArrays(object) {
	for(var item in object.data) {
		if(typeof object.data[item] === 'string'){
			if(object.data[item][0] === '[') {
				object.data[item] = eval(object.data[item]);
			}
		}
		
	}
}