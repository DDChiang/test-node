//root module

mainApp = angular.module('AppIndex', ['ngRoute']);

mainApp.config(function($routeProvider, $locationProvider) {
	
	$locationProvider.html5Mode(true);
	
	$routeProvider
	
	.when('/', {
		templateurl: '/partials/main.html',
		controller: 'indexCtrl'
	});
});