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
	let category = req.body.category;
	let amount = req.body.amount;
	let description = req.body.description;

	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let newStockItem = {name: name, category: category , author: author}
	// Create a new stock and save to DB
	Stock.create(newStockItem, function(err, newlyCreated){
		console.log(measure)
		if(err){
			console.log(err);
		} else {
// 			redirect back to stock page
			res.redirect('stock');
		}
	});

});

// SHOW - shows more info about the stock item
router.get('/:id', middleware.isLoggedIn, function(req, res) {
// 	find the stock item with provided id
	Stock.findById(req.params.id).populate("measures").exec(function(err, foundStockItem){
		if(err){
			console.log(err)
		} else {
		console.log(foundStockItem)
			// 	render show template with that item
		res.render('stock/show', {stock: foundStockItem})
		}
	});
});

// EDIT STOCK ROUTE
router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
		Stock.findById(req.params.id, function(err, foundStockItem) {
			if(err){
				console.log(err)
				res.redirect("/stock")
			}
				res.render('stock/edit', {stock: foundStockItem});	
		});
});

// UPDATE STOCK ROUTE

router.put('/:id', function(req, res){
// 	find and update correct stock item

	Stock.findByIdAndUpdate(req.params.id, req.body.stock, function(err, updatedStock) {

		if(err) {
			console.log(err)
			res.redirect('/stock');
		}else {
			res.redirect('/stock/' + req.params.id);
		}
	})
// 	redirect back to the show page
});


module.exports = router;