//root module

//add dependencies
var mainApp = angular.module('mainPage', ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider

	//route for home page
	.when('/', {
		templateUrl:'partials/main.html',
		controller: 'mainCtrl'
	})
	
	.when('/page1', {
		templateUrl:'partials/page1.html',
		controller:'mainCtrl'
	})
	
	.when('/page2', {
		templateUrl:'partials/page2.html',
		controller:'mainCtrl'
	})
	
	.when('/page3', {
		templateUrl:'partials/page3.html',
		controller:'mainCtrl'
	})

});

