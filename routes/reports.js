const express = require('express'),
    Stock = require('../models/stock'),
    Measure = require("../models/measures"),
    StockUpdate = require("../models/stockItemUpdate"),
    History = require('../models/history'),
    middleware = require('../middleware'),
    passport = require('passport'),
    router = express.Router({ mergeParams: true });



router.get('/', middleware.isLoggedIn, async (req, res) => {

    try {

        const stock = await Stock
            .find()
            .populate('measures')
            .populate({
                path: 'stockTake',
                model: 'StockTake',
                populate: {
                    path: 'history',
                    model: 'History'
                }
            })
        // get an array dates for each day
        let dates = stock.map(item => item.stockTake.map(stockTake => stockTake.history.map(history => history.date))).flat(2) || [];


        let eachDate = Array.from(new Set(dates)) || [];
        // create an array for each name of a stock item
        let stockItems = stock.map(item => item.name);

        // get sold and wated items
        let daySales = [];
        let dayWaste = [];
        eachDate.forEach(day => {
            // console.log(day)
            let salesPerDay = {}
            salesPerDay.date = day;

            stockItems.forEach(item => {
                // console.log(stock.filter(x => x.name == item).map(entry => entry.stockTake).flat().map(stockItem => stockItem.history).flat().map(history => (history.date === day) ? history.changeFromLastInKg : 0))
                let sold = stock
                    .filter(x => x.name == item)
                    .map(entry => entry.stockTake).flat()
                    .map(stockItem => stockItem.history).flat()
                    .map(history => (history.date === day && history.action !== "waste") ? history.changeFromLastInKg : 0)

                // sum up all sales from the day
                let daySales = 0;
                for (let i = 0; i < sold.length; i++) {
                    daySales += Number(Math.abs(sold[i]))
                }
                // display day sales 
                salesPerDay[item] = daySales.toFixed(2);
            });
            // ==== WASTE ========
            let wastePerDay = {}
            wastePerDay.date = day;

            stockItems.forEach(item => {
                // console.log(stock.filter(x => x.name == item).map(entry => entry.stockTake).flat().map(stockItem => stockItem.history).flat().map(history => (history.date === day) ? history.changeFromLastInKg : 0))
                let wasted = stock
                    .filter(x => x.name == item)
                    .map(entry => entry.stockTake).flat()
                    .map(stockItem => stockItem.history).flat()
                    .map(history => (history.date === day && history.action === "waste") ? history.changeFromLastInKg : 0)

                // sum up all sales from the day
                let dayWaste = 0;
                for (let i = 0; i < wasted.length; i++) {
                    dayWaste += Number(Math.abs(wasted[i]))
                }
                // display day sales 
                wastePerDay[item] = dayWaste.toFixed(2);

            })

            daySales.push(salesPerDay)
            dayWaste.push(wastePerDay)

        })


        // console.log(daySales)

        stock.map(item => item.stockTake.map(stockTake => stockTake.history.map(history => history.date)))


        res.render('reports/index', { stock: stock, dates: eachDate, daySales: daySales, dayWaste: dayWaste });


    } catch (err) {
        console.log(err);
    }

});

// Always `populate()` after `find()` calls. Useful if you want to selectively populate
// based on the docs found.
// MySchema.post('find', async function(docs) {
//     for (let doc of docs) {
//       if (doc.isPublic) {
//         await doc.populate('user').execPopulate();
//       }
//     }
//   });


























// // SHOW - shows more info about the stock item
// router.get('/:id', middleware.isLoggedIn, function (req, res) {
//     // 	find the stock item with provided id
//     Stock.findById(req.params.id).populate("measures").populate("stockTake").populate("history").exec(function (err, foundStockItem) {
//         if (err) {
//             console.log(err)
//         } else {
//             // 	render show template with that item
//             res.send('hit the reports route')
//             // res.render('stock/show', { stock: foundStockItem })
//         }
//     });
// });

module.exports = router;