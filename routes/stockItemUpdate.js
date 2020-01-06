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
    Stock.findById(req.params.id, function (err, stock) {
        if (err) {
            req.flash("error", "Stock item not found");
            res.redirect("/stock/");
        } else {
            // Add a new storage method 
            History.create(req.body.stock, function (err, stockItem) {
                // console.log(stock)
                stockItem.action = "created";

                stock.history.push(stockItem);

                stockItem.save();


            });
            StockUpdate.create(req.body.stock, function (err, stockItem) {

                if (err) {
                    req.flash("error", "Something went wrong");
                } else {
                    stock.stockTake.push(stockItem);
                    console.log(stock.history)
                    stock.save();
                    console.log(stock.stockTake[stock.stockTake.length - 1])
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

    Stock.findById(req.params.id).populate("history").exec(function (err, stock) {
        History.create(req.body.stock, function (err, stockItem) {
            console.log(stock)
            stockItem.action = "update";

            stock.history.push(stockItem);
            stockItem.save();
            stock.save();
        })
        console.log(req.body)


    });
    StockUpdate.findByIdAndUpdate(req.params.stockTake_id, req.body.stock, function (err, stock) {

        if (err) {
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            res.redirect("/stock/" + req.params.id);

        }
    });
});

// Destroy route
router.delete("/:stockTake_id", middleware.isLoggedIn, function (req, res) {
    console.log(res)

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