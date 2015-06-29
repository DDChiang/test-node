var groceryApp = angular.module('grocery', []);

groceryApp.controller('groceryCtrl', function($scope) {
	$scope.message = 'hee';
	
	$scope.list = [{ name: 'apple', quant: 3, price: 0 }, { name: 'orange', quant: 2, price: 1 }
	,{ name: 'meat', quant: 4, price: 7.25}, {name: 'grape juice', quant: 2, price : 1.5 }
	];


    //check list
	$scope.layOutList = function () {
	    return JSON.stringify($scope.list);
	}

    //sum total items
	$scope.totalItems = function () {
		var itemTot = 0;
		var c = 0;
		var listL = $scope.list.length;

		for (; c < listL;) {
			itemTot += $scope.list[c].quant;
			c++;
		}

		return parseInt(itemTot);

	}

    //sum total price
	$scope.totalPrice = function () {
		var itemPrice = 0;
		var p = 0;
		var listL = $scope.list.length;

		for (; p < listL;) {
			itemPrice += ($scope.list[p].price * $scope.list[p].quant);
			p++;
		}
		return parseInt(itemPrice);
	}
		//deal with this later
		//angular selector
	var myEl = angular.element(document.querySelector('.grocery_list'));

    //add row
	$scope.addRow = function () {

	    if (angular.isNumber($scope.ingredQ) && angular.isNumber($scope.ingredP) && (($scope.ingredN + '').length>0))
	    {
	        $scope.list.push({
	            name: $scope.ingredN,
	            quant: $scope.ingredQ,
	            price: $scope.ingredP
	        });

	        //clear input fields
	        $scope.ingredN = '';
	        $scope.ingredQ = '';
	        $scope.ingredP = '';
	    }
	    else
	    {
	        alert("please correct your input");
	    }


	}

    //delete row        (only need index for deleting rows) //in html, attach "$index to delete button
	$scope.deleteRow = function (index) {
	    $scope.list.splice(index, 1);
	}

	//$scope.length = $scope.list.length; //this isn't updating// declaring it makes it only run once. need a fn
	$scope.length = function () {
	    return $scope.list.length;
	}

});


$(window).load(function () {
    $('body').fadeIn(1000, function () { });
});


	