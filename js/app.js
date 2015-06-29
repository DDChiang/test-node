//root module

var mainApp = angular.module('appIndex', ['ngRoute']);

//routing doesn't wotk this time. find out why.

mainApp.config(function ($routeProvider) {
	$routeProvider

	.when('/#/', {
		templateurl:'partials/main.html',
		controller: 'indexCtrl'
	})
	
	.when('/resume.html', {
		templateurl:'/partials/resume.html',
		controller: 'indexCtrl'
	})
	
	.when('/#/skills', {
	    templateurl: '/skills.html',
	    controller: 'indexCtrl'
	})
	
	.when('/#/contact', {
		templateurl: '/partials/contact.html',
		controller: 'indexCtrl'
	});

});


mainApp.controller('indexCtrl', function($scope) {
	$scope.message = 'message from ang test';
});