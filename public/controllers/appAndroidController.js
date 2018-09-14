var app = angular.module('app-ecosystem');

app.filter('trustAsHtml', function($sce) {
	return function(html) {
		return $sce.trustAsHtml(html);
	}
})

app.controller('AppAndroidController', function($http, $scope, $routeParams, $sce) {

	function convertAllArrays(object) {
		for(var item in object.data) {
			if(typeof object.data[item] === 'string'){
				if(object.data[item][0] === '{') {
					object.data[item] = object.data[item].replace('{', '[');
					object.data[item] = object.data[item].replace('}', ']');
					object.data[item] = eval(object.data[item]);
				}
			}

			if(item === 'screenshots') {
				for(screenshot in object.data[item]){
					object.data[item][screenshot] = object.data[item][screenshot].replace('//', '').replace('=h310', '');
				}
			}
		}
	}

	$http.get('/api/search/android/' + $routeParams.id).then( function(data) {
		convertAllArrays(data)
		console.log(data.data)
		$scope.data = data.data;
	})
})