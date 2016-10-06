var itemcart = angular.module('itemcart', []);

itemcart.controller('cartController', function($scope, $http) {
	$scope.items = [{
		"item_name"		:	"God of War",
		"item_price"	:	14.99,
		"item_count"	:	0
	},
	{
		"item_name"		:	"Portable Light Rope and Lantern",
		"item_price"	:	19.99,
		"item_count"	:	0
	},
	{
		"item_name"		:	"Solar Phone Charger",
		"item_price"	:	39.99,
		"item_count"	:	0
	},
	{
		"item_name"		:	"MacBook Selfie Stick",
		"item_price"	:	9.99,
		"item_count"	:	0
	},
	{
		"item_name"		:	"Fiber Optic Hoodie",
		"item_price"	:	499.99,
		"item_count"	:	0
	}];
	
	$scope.cartItems = [];
	
	$http({
		method:	'POST',
		url:	'/sessionItems'
	}).success(function(data) {
		$scope.cartItems = data.cartItems;
		$scope.total = data.price;
	}).error(function(error) {
		// TODO: Handle Errors
	});
	
	$scope.add = function() {
		$scope.errorMessage = "";
		var negativeCount = false;
		var cartItems = [];
		for(var i = 0; i < $scope.items.length; i++) {
			if($scope.items[i].item_count > 0) {
				cartItems.push($scope.items[i]);
			} else if($scope.items[i].item_count < 0) {
				negativeCount = true;
				break;
			}
		}
		if(negativeCount) {
			for(var i = 0; i < $scope.items.length; i++) {
				$scope.items[i].item_count = 0;
			}
			$scope.errorMessage = "Negative number of items cannot be added to cart.";
		} else {
			$http({
				method	:	'POST',
				url		:	'/addItems',
				data	:	{
					"cartItems"	:	cartItems
				}
			}).success(function(data) {
				$scope.total = data.price;
				$scope.cartItems = data.cartItems;
				for(var i = 0; i < $scope.items.length; i++) {
					$scope.items[i].item_count = 0;
				}
			}).error(function(error) {
				// TODO: Handle Errors
			});
		}
	}
});