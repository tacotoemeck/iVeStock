const express = require('express'),
    Stock = require('../models/stock'),
    Measure = require("../models/measures"),
    StockUpdate = require("../models/stockItemUpdate"),
    middleware = require('../middleware'),
    passport = require('passport'),
    router = express.Router({ mergeParams: true });


router.use(express.static(__dirname + '/public'));

router.get("/new", middleware.isLoggedIn, (req, res) => {
    let measures = [];
    Stock.findById(req.params.id, (err, stock) => {

        if (err) {
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {

            if (stock.measures.length > 0) {
                stock.measures.map((x) => {
                    Measure.findById(x, (err, item) => {
                        measures.push(item)
                    })
                })
                setTimeout(function () { res.render("stockItems/show", { stock: stock, measures: measures }); }, 1000);

            } else {

                res.render("stockItems/show", { stock: stock });
            }
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

            StockUpdate.create(req.body.stock, function (err, stockItem) {

                if (err) {
                    req.flash("error", "Something went wrong");
                } else {
                    stock.stockTake.push(stockItem);
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
            let measures = [];
            Stock.findById(req.params.id, (err, item) => {

                if (item.measures.length > 0) {
                    item.measures.map((x) => {
                        console.log(x)
                        Measure.findById(x, (err, val) => {
                            measures.push(val)
                        })
                    })
                    console.log(req.params)
                    setTimeout(function () { res.render("stockItems/edit", { stockItems: stockItem, stock_id: req.params.id, measures: measures, stock: req.params }); }, 1000);

                }
            })




            // res.render("stockTake/edit", { stockItems: stockItem, stock_id: req.params.id, stock: req.params });
        }
    });
});

// Update route
// router.put("/:stockUpdate_id", middleware.isLoggedIn, function (req, res) {
//     console.log(req.params.measures_id)
//     StockUpdate.findByIdAndUpdate(req.params.measures_id, req.body.measures, function (err, stock) {
//         if (err) {
//             req.flash("error", "Item not found");
//             res.redirect("back");
//         } else {
//             res.redirect("/stock/" + req.params.id);
//             // res.send('you hit update')
//         }
//     });
// });

// // Destroy route
// router.delete("/:measures_id", middleware.isLoggedIn, function (req, res) {
//     Measure.findByIdAndRemove(req.params.measures_id, function (err) {
//         if (err) {
//             req.flash("error", "Item not found");
//             res.redirect("back");
//         } else {
//             req.flash("success", "Successfully deleted a storage unit");
//             res.redirect("/stock/" + req.params.id);
//         }
//     });
// });

module.exports = router;