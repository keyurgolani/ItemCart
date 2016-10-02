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
	
	$scope.cart = [];
	
	$http({
		method:	'POST',
		url:	'/sessionItems',
		
	})
});