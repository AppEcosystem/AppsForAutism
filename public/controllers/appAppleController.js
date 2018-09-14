var app = angular.module('app-ecosystem');

function convertAllArrays(object) {
	for(var item in object.data) {
		if(typeof object.data[item] === 'string'){
			if(object.data[item][0] === '[') {
				object.data[item] = eval(object.data[item]);
			}
		}
	}

	return object.data
}

app.controller('AppAppleController', function($http, $scope, $routeParams){
	$http.get('/api/search/' + $routeParams.id).then(function(data) {
		$scope.data = convertAllArrays(data);
	})
})