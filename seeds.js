const mongoose = require('mongoose'),
    Stock = require('./models/stock'),
    Measure = require('./models/measures'),
    StockTake = require('./models/stockItemUpdate');

let data = [
    {
        name: "Chicken",
        category: "Cooked",
    },
    {
        name: "Beef",
        category: "Cooked",
    },
    {
        name: "Cactus",
        category: "Fresh",
    }
]


function seedDB() {
    //Remove all campgrounds
    Stock.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed all stock items!");
        Measure.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed measuring units!");
            //add a few stock items
            data.forEach(function (seed) {
                Stock.create(seed, function (err, stock) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a stock item");
                        //create a measuruing method
                        Measure.create(
                            {
                                name: "Araven",
                                weight: "12"
                            }, function (err, measure) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    stock.measures.push(measure);

                                    console.log("Created new measuring unit");
                                }
                            });
                        StockTake.create(
                            {
                                volume: "10",
                                storingUnit: "Araven",
                                location: "Southbank"
                            }, function (err, stockitem) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(stock)
                                    stock.stockTake.push(stockitem);
                                    stock.save();
                                    console.log("Created new item unit");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}




module.exports = seedDB;

