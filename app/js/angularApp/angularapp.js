var angularapp = angular.module('nameApp',['ngRoute', 'pagesController','pagesDirective']);
var paths={
	pages: '/js/angularApp/pages/'
};

angularapp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/',{
			templateUrl: paths.pages + 'home/home.html',
			controller: 'homeController'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);