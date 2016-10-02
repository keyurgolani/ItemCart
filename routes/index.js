var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/sessionItems', function(req, res, next) {
	var cartItems = [];
	var price = 0;
	if(req.session !== undefined && req.session.cartItems !== undefined) {
		cartItems = req.session.cartItems;
		price = Number(req.session.price);
	}
	res.send({
		"cartItems"	:	cartItems,
		"price"		:	price
	});
});

router.post('/addItems', function(req, res, next) {
	var addItems = req.body.cartItems;
	var cartItems = [];
	var totalPrice = 0;
	if(req.session.cartItems && req.session.price) {
		cartItems = req.session.cartItems;
		totalPrice = req.session.price;
	}
	for(var i = 0; i < addItems.length; i++) {
		var added = false;
		for(var j = 0; j < cartItems.length; j++) {
			if(cartItems[j].item_name === addItems[i].item_name) {
				cartItems[j].item_count = Number(cartItems[j].item_count) + Number(addItems[i].item_count);
				added = true;
				break;
			}
		}
		if(!added) {
			cartItems.push(addItems[i]);
		}
		totalPrice = totalPrice + Number(addItems[i].item_price) * Number(addItems[i].item_count);
	}
	req.session.cartItems = cartItems;
	req.session.price = totalPrice;
	res.send({
		"cartItems"	:	req.session.cartItems,
		"price"		:	req.session.price
	});
});

module.exports = router;
