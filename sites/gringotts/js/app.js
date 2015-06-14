var gringottApp = angular.module('gringott', ['ngRoute']);

gringottApp.config(function ($routeProvider) {
	$routeProvider

//route for home page
	.when('/', {
		templateUrl:'partials/main.html',
		controller: 'gringottCtrl'
	})
	
	.when('/form', {
		templateUrl:'partials/form.html',
		controller: 'gringottCtrl'
	})
	
	

});

gringottApp.controller('gringottCtrl', function($scope, $http) {
	$scope.message = 'Gringott Message';
	$scope.fName = 'Jane';
	$scope.lName = 'Doe';
	$scope.uName = 'JaneDoe121';
	$scope.email = 'email';
	$scope.emailCon = '';
	$scope.password = 'password';
	$scope.passwordCon = '';
	$scope.newUser = $scope.fName + " " + $scope.lName;
	$scope.newUserMessage = "Welcome " + $scope.newUser + ".";

	

});