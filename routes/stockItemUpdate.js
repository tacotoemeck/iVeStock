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



// // New route
// router.get("/new", middleware.isLoggedIn, function (req, res) {
//     Stock.findById(req.params.id, function (err, stock) {
//         console.log(stock)
//         console.log(res)
//         if (err) {
//             req.flash("error", "Item not found");
//         } else {
//             res.render("stockItems/show", { stock: stock, measures: measures })

//             Measure.findById(user.friends[i])
//                 .then((friend) => {
//                     friends.unshift({
//                         firstName: friend.firstName,
//                         lastName: friend.lastName,
//                         _id: friend._id
//                     })
//                 })
//                 .then(() => {
//                     res.render("user", { userData: user, friends: friends })
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     req.flash("error", "Could not find the friends list")
//                     res.redirect("back")
//                 })



//             // Measure.findById(stock.measures[0], (err, measure) => {
//             //     if (err) {
//             //         req.flash("error", "Item not found");
//             //     } else {
//             //         console.log(stock.measures)
//             //         res.render("stockItems/show", { stock: stock, measures: measure });
//             //     }
//             // })
//             // console.log(stock.measures[0])
//             // res.render("stockItems/show", { stock: stock, measures: stock.measures });
//         }
//     });
// });


// Create route
router.post("/", middleware.isLoggedIn, function (req, res) {
    Stock.findById(req.params.id, function (err, stock) {
        if (err) {
            req.flash("error", "Stock item not found");
            res.redirect("/stock/");
        } else {
            // Add a new storage method 
            console.log(stock)
            StockUpdate.create(req.body.stock, function (err, stockItem) {
                console.log(req.body.stock)
                console.log(stockItem)
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

// // Edit route
// router.get("/:measures_id/edit", middleware.isLoggedIn, function (req, res) {

//     // Retrieve the measure unit with matching ID from database
//     Measure.findById(req.params.measures_id, function (err, measures) {

//         if (err) {
//             req.flash("error", "Item not found");
//             res.redirect("back");
//         } else {
//             console.log(req.params)
//             res.render("measures/edit", { measures: measures, stock_id: req.params.id, stock: req.params });
//         }
//     });
// });

// // Update route
// router.put("/:measures_id", middleware.isLoggedIn, function (req, res) {
//     console.log(req.params.measures_id)
//     Measure.findByIdAndUpdate(req.params.measures_id, req.body.measures, function (err, stock) {
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