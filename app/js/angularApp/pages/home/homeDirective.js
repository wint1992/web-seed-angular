angular.module('pagesDirective')
	.directive('home-content',function(){
		return {
			restrict: "E",
			templateUrl: paths.pages + "home/directives/homeContent.html",
			replace: true,
			controller: 'homeController'
		};		
	});