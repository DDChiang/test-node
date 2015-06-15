var groceryApp = angular.module('grocery', []);

groceryApp.controller('groceryCtrl', function($scope) {
	$scope.message = 'hee';
	
	$scope.list = [{ name: 'banana', quant: 4, price: .25 }, { name: 'apple', quant: 3, price: 0 }, { name: 'orange', quant: 2, price: 1 }
	,{ name: 'meat', quant: 4, price: 7.25}, {name: 'grape juice', quant: 2, price : 1.5 }, { name: 'celery', quant: 5, price: .20 }
	];

	$scope.length = $scope.list.length;

	$scope.totalItems = function () {
		var itemTot = 0;
		var c = 0;
		var listL = $scope.list.length;

		for (; c < listL;) {
			itemTot = itemTot + $scope.list[c].quant;
			c++;
		}

		return parseInt(itemTot);

	}

	$scope.totalPrice = function () {
		var itemPrice = 0;
		var c = 0;
		var listL = $scope.list.length;

		for (; c < listL;) {
			itemPrice = itemPrice + ($scope.list[c].price * $scope.list[c].quant);
			c++;
		}
		return parseInt(itemPrice);
	}
		//deal with this later
		//angular selector
	var myEl = angular.element(document.querySelector('.grocery_list'));

		//function addRow() {
		////$scope.list[$scope.list.length].name = 'item';
	////$scope.list[$scope.list.length].quant =  0;
	////$scope.list[$scope.list.length].price = 0;
	//	myEl.append("<li>Name: <input type='text' ng-model='x.name'/>Quant: <input type='number' ng-model='x.quant' /> Price: $<input type='number' ng-model='x.price' /></li>");
	//	$scope.list.push({ name: 'banana', quant: 4, price: 1.25});
		
	//};

	//$('.addRow').click(function() {
	//	addRow();
	//});

});


//myEl.append("<li>Name: <input type='text' ng-model='" + $scope.list[$scope.list.length].name + "'/>Quant: <input type='number' ng-model='" +$scope.list[$scope.list.length].quant + "' /> Price: $<input type='number' ng-model='" +$scope.list[$scope.list.length].price + "' /></li>");
	