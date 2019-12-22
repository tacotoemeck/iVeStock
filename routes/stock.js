const express 				= require('express'),
	  router 				= express.Router(),
	  Stock					= require('../models/stock'),
	  passport				= require('passport'),
	  middleware			= require('../middleware');

// INDEX - Show all stock


router.get('/',  middleware.isLoggedIn, (req, res) => {
	Stock.find({}, (err, allStock) => {
		if(err) {
			console.log(err)
		} else {
				res.render('stock/index', {stock: allStock});
		}
	});
});



//  NEW - show for to create a new stock item
router.get('/new', middleware.isLoggedIn,(req, res) => {
	res.render('stock/new');
});


// CREATE - add new stock item to DB
router.post('/', middleware.isLoggedIn, function(req, res) {
	//get data from form and add to stock array
	let name = req.body.name;
	let measure = req.body.measure;
	let amount = req.body.amount;
	// let description = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let newStockItem = {name: name, measure: measure, amount: amount, author: author}
	// Create a new stock and save to DB
	Stock.create(newStockItem, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
// 			redirect back to stock page
			res.redirect('stock');
		}
	});

});

module.exports = router;