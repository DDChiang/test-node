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
	
	.when('/fin', {
	    templateUrl: 'partials/test-page.html',
	    controller: 'gringottCtrl'
	})

});

gringottApp.controller('gringottCtrl', function($scope, $http) {
	
    $scope.name = 'Test Name';
    //$scope.email = 'test@email';
    $scope.hello = {name: 'Boaz'};
	$scope.newUser = $scope.fName + " " + $scope.lName;
	$scope.newUserMessage = "Welcome " + $scope.newUser + ".";
	//$scope.sendPost = function () {
	//    var data = $.param({
	//        json: JSON.stringify({
	//            name: $scope.name,
    //            email: $scope.email
	//        })
	//    });

	//    $http.post('/test-page.html', data).success(function (data, status) {
	//        $scope.hello = data;
	//    }).error(function (data, status) {
	//        alert(data + "<br>" + status);
	//        $('body').html('not wokring');
	//    });

	//}
	
    //hackity way
	$scope.newUserTrigger = function () {

	    //if (!(contact.contactName.$pristine || contact.contactEmail.$pristine || contact.contactEmail.$invalid
	    //    || contact.contactText.$pristine || (!contact.problemType)))

	    {
	        $scope.mess1 = "Thank you " + $scope.fName + " for your interest in our program. We will be in touch shortly.";
	        $('#lightbox1').css({ 'display': 'block' });
	    }
	   

	}

	$scope.triggerPage = function () {
	    //var data = JSON.stringify({
	    //    name: $scope.contactName,
	    //    email: $scope.contactEmail
	    //})
	        $scope.mess2 = "Thank you " + $scope.name + " for your interest. We'll be in touch shortly.";
	        $('#lightbox2').css({ 'display': 'block' });
	};

	$scope.subscribeEmail = '';

    //must include this in app.js since loads after
	$('.form a').click(function (e) {
	    e.preventDefault();
	    alert('Login does not exist yet. Try filling out a form');
	    $('input').eq(0).focus();
	});
});