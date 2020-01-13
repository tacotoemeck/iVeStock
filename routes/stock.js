const express = require('express'),
	router = express.Router(),
	Stock = require('../models/stock'),
	passport = require('passport'),
	middleware = require('../middleware');

// INDEX - Show all stock


router.get('/', middleware.isLoggedIn, (req, res) => {
	Stock.find({}).populate("stockTake").exec(function (err, allStock) {
		if (err) {
			console.log(err)
		} else {
			// // get all stock items in an array
			// let stockItems = [];
			// // let locations = [];
			// allStock.forEach(stock => stock.stockTake.map(stockTake => stockItems.push(stockTake)))
			// let locations = new Set(stockItems.map(item => item.location))
			// console.log(locations)
			// iterate through stockItems array and get individual locations
			res.render('stock/index', { stock: allStock });
		}
	});
});



//  NEW - show for to create a new stock item
router.get('/new', middleware.isLoggedIn, (req, res) => {
	res.render('stock/new');
});


// CREATE - add new stock item to DB
router.post('/', middleware.isLoggedIn, function (req, res) {
	//get data from form and add to stock array
	let name = req.body.name;
	let category = req.body.category;
	let icon = req.body.icon;
	// let amount = req.body.amount;
	// let description = req.body.description;
	// let measure = req.body.measure;
	// let stockTake = req.body.stockTake;

	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let newStockItem = { name: name, icon: icon, category: category, author: author }
	// Create a new stock and save to DB
	Stock.create(newStockItem, function (err, newlyCreated) {

		if (err) {
			console.log(err);
		} else {
			// 			redirect back to stock page
			res.redirect('stock');
		}
	});

});

// SHOW - shows more info about the stock item
router.get('/:id', middleware.isLoggedIn, function (req, res) {
	// 	find the stock item with provided id
	Stock.findById(req.params.id).populate("measures").populate("stockTake").populate("history").exec(function (err, foundStockItem) {
		if (err) {
			console.log(err)
		} else {
			console.log(foundStockItem)
			// 	render show template with that item
			res.render('stock/show', { stock: foundStockItem })
		}
	});
});

// EDIT STOCK ROUTE
router.get('/:id/edit', middleware.isLoggedIn, function (req, res) {
	Stock.findById(req.params.id, function (err, foundStockItem) {
		if (err) {
			console.log(err)
			res.redirect("/stock")
		}
		res.render('stock/edit', { stock: foundStockItem });
	});
});

// UPDATE STOCK ROUTE

router.put('/:id', middleware.isLoggedIn, function (req, res) {
	// 	find and update correct stock item

	Stock.findByIdAndUpdate(req.params.id, req.body.stock, function (err, updatedStock) {

		if (err) {
			console.log(err)
			res.redirect('/stock');
		} else {
			res.redirect('/stock/' + req.params.id);
		}
	})
	// 	redirect back to the show page
});

// Destroy route
router.delete("/:id", middleware.isLoggedIn, function (req, res) {
	Stock.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			req.flash("error", "Stock Item not found");
			res.redirect("back");
		} else {
			req.flash("success", "Successfully deleted Stock Item");
			res.redirect("/stock");
		}
	});
});


module.exports = router;