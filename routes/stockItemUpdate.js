const express = require('express'),
    Stock = require('../models/stock'),
    Measure = require("../models/measures"),
    StockUpdate = require("../models/stockItemUpdate"),
    History = require('../models/history'),
    middleware = require('../middleware'),
    passport = require('passport'),
    router = express.Router({ mergeParams: true });


router.use(express.static(__dirname + '/public'));

router.get("/new", middleware.isLoggedIn, (req, res) => {
    let measures = [];
    Stock.findById(req.params.id).populate("measures").populate("stockTake").populate("history").exec(function (err, stock) {

        if (err) {
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            res.render("stockItems/show", { stock: stock });
        }
    });
});



// Create route
router.post("/", middleware.isLoggedIn, function (req, res) {
    Stock.findById(req.params.id).populate("stockTake").populate("history").exec(function (err, stock) {
        if (err) {
            req.flash("error", "Stock item not found");
            res.redirect("/stock/");
        } else {
            // Add a new storage method 
            StockUpdate.create(req.body.stock, function (err, stockItem) {

                if (err) {
                    req.flash("error", "Something went wrong");
                } else {
                    let today = new Date();
                    let dd = String(today.getDate()).padStart(2, '0');
                    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    let yyyy = today.getFullYear();

                    History.create(stockItem, function (err, item) {
                        stockItem.date = mm + '/' + dd + '/' + yyyy;
                        stockItem.action = "created";
                        stockItem.history.push(stockItem);
                        stockItem.markModified('history');
                        stock.markModified('stockItem');
                        stockItem.save();
                    });
                    stock.stockTake.push(stockItem);
                    console.log(stock)
                    stock.save();
                    res.redirect('/stock/' + stock._id)
                }
            });
        }
    });
});

// Edit route
router.get("/:stockTake_id/edit", middleware.isLoggedIn, function (req, res) {

    // Retrieve the stock item unit with matching ID from database
    StockUpdate.findById(req.params.stockTake_id, function (err, stockItem) {

        if (err) {
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            Stock.findById(req.params.id).populate("measures").populate("stockTake").populate("history").exec(function (err, item) {
                res.render("stockItems/edit", { stockItems: stockItem, items: item, stock_id: req.params.id, stock: req.params });
            })


        }
    });
});

// Update route
router.put("/:stockTake_id", middleware.isLoggedIn, function (req, res) {

    StockUpdate.findByIdAndUpdate(req.params.stockTake_id, req.body.stock).populate("history").exec(function (err, stock) {

        if (err) {
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            History.create(req.body.stock, function (err, stockItem) {
                stockItem.date = mm + '/' + dd + '/' + yyyy;
                stockItem.action = "update";
                stockItem.changeFromLast = -(Number(stock.volume) - Number(stockItem.volume));
                stock.history.push(stockItem);
                stockItem.save();
                stock.save();
                console.log(stock)

            })
            res.redirect("/stock/" + req.params.id);

        }
    });
});

// Destroy route
router.delete("/:stockTake_id", middleware.isLoggedIn, function (req, res) {


    StockUpdate.findByIdAndRemove(req.params.stockTake_id, function (err) {
        if (err) {
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            req.flash("success", "Item sold OR marked as waste");
            res.redirect("/stock/" + req.params.id);
        }
    });
});

module.exports = router;