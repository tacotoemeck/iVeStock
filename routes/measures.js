const express = require('express'),
    Stock = require('../models/stock'),
    Measure = require("../models/measures"),
    middleware = require('../middleware'),
    passport = require('passport'),
    router = express.Router({ mergeParams: true });


router.use(express.static(__dirname + '/public'));

// New route
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Stock.findById(req.params.id, function (err, stock) {
        if (err) {
            req.flash("error", "Item not found");
        } else {

            res.render("measures/new", { stock: stock });
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
            Measure.create(req.body.measure, function (err, measure) {
                if (err) {
                    req.flash("error", "Something went wrong");
                } else {
                    stock.measures.push(measure);
                    stock.save();
                    res.redirect('/stock/' + stock._id)
                }
            });
        }
    });
});

// Edit route
router.get("/:measures_id/edit", middleware.isLoggedIn, function (req, res) {

    // Retrieve the measure unit with matching ID from database
    Measure.findById(req.params.measures_id, function (err, measures) {

        if (err) {
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {

            res.render("measures/edit", { measures: measures, stock_id: req.params.id, stock: req.params });
        }
    });
});

// Update route
router.put("/:measures_id", middleware.isLoggedIn, function (req, res) {

    Measure.findByIdAndUpdate(req.params.measures_id, req.body.measures, function (err, stock) {
        if (err) {
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            res.redirect("/stock/" + req.params.id);
            // res.send('you hit update')
        }
    });
});

// Destroy route
router.delete("/:measures_id", middleware.isLoggedIn, function (req, res) {
    Measure.findByIdAndRemove(req.params.measures_id, function (err) {
        if (err) {
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully deleted a storage unit");
            res.redirect("/stock/" + req.params.id);
        }
    });
});

module.exports = router;