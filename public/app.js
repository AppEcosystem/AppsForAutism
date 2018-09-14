var app = angular.module('app-ecosystem', ['ngRoute', 'ngAnimate']);
app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});

// app.factory('PagerService', PagerService) 

// function PagerService() {
//         // service definition
//         var service = {};

//         service.GetPager = GetPager;

//         return service;

//         // service implementation
//         function GetPager(totalItems, currentPage, pageSize) {
//             // default to first page
//             currentPage = currentPage || 1;

//             // default page size is 10
//             pageSize = pageSize || 10;

//             // calculate total pages
//             var totalPages = Math.ceil(totalItems / pageSize);

//             var startPage, endPage;
//             if (totalPages <= 10) {
//                 // less than 10 total pages so show all
//                 startPage = 1;
//                 endPage = totalPages;
//             } else {
//                 // more than 10 total pages so calculate start and end pages
//                 if (currentPage <= 6) {
//                     startPage = 1;
//                     endPage = 10;
//                 } else if (currentPage + 4 >= totalPages) {
//                     startPage = totalPages - 9;
//                     endPage = totalPages;
//                 } else {
//                     startPage = currentPage - 5;
//                     endPage = currentPage + 4;
//                 }
//             }

//             // calculate start and end item indexes
//             var startIndex = (currentPage - 1) * pageSize;
//             var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

//             // create an array of pages to ng-repeat in the pager control
//             var pages = _.range(startPage, endPage + 1);

//             // return object with all pager properties required by the view
//             return {
//                 totalItems: totalItems,
//                 currentPage: currentPage,
//                 pageSize: pageSize,
//                 totalPages: totalPages,
//                 startPage: startPage,
//                 endPage: endPage,
//                 startIndex: startIndex,
//                 endIndex: endIndex,
//                 pages: pages
//             };
//         }
//     }

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/templates/landing.html',
		controller: 'MainController'
	})
    .when('/about', {
        templateUrl: 'views/templates/about_page.html',
        controller: 'AboutController'
    })
	.when('/app/:id', {
		templateUrl: 'views/templates/app.html',
		controller: 'AppAppleController'
	})
    .when('/app/android/:id', {
        templateUrl: 'views/templates/app_android.html',
        controller: 'AppAndroidController'
    })
	.when('/search', {
		templateUrl: 'views/templates/search.html',
		controller: 'SearchController'
	})
    .when('/404', {
        templateUrl: 'views/templates/404.html',
    })
    .otherwise({
        redirectTo: '/404'
    })
});






