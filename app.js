/**
 * Required External Modules
 */
const express = require('express'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	path = require('path'),
	bodyParser = require('body-parser'),
	User = require('./models/user'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	Stock = require("./models/stock"),
	History = require("./models/history"),
	Measure = require("./models/measures"),
	StockUpdate = require("./models/stockItemUpdate"),
	passport = require('passport'),
	passportLocalMongose = require('passport-local-mongoose'),
	seedDB = require('./seeds'),
	middleware = require('./middleware');


const authRoutes = require('./routes/auth'),
	stockRoutes = require('./routes/stock'),
	historyRoutes = require('./routes/history'),
	measureRoutes = require('./routes/measures'),
	stockUpdateRoutes = require('./routes/stockItemUpdate'),
	reportRoutes = require('./routes/reports');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "3000";

/**
 *  App Configuration
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// console.log(process.env.DATABASEURL)

// seedDB();
// mongoose.connect('mongodb://localhost/iVeStock', { useNewUrlParser: true, useUnifiedTopology: true })
// 	.then(() => console.log('connecting to database successful'))
// 	.catch(err => console.error('could not connect to mongo DB', err));
mongoose.connect('mongodb+srv://tommy:peezda69@cluster0-odf2b.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('connecting to database successful'))
	.catch(err => console.error('could not connect to mongo DB', err));

// mongodb+srv://tommy:<password>@cluster0-odf2b.mongodb.net/test?retryWrites=true&w=majority

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));



// PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: "no secret here",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next()
});

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.get('/home', middleware.isLoggedIn, (req, res) => {
	res.render('home')
});

app.use(authRoutes);
app.use('/stock', stockRoutes);
app.use('/stock/:id/history', historyRoutes);
app.use('/stock/:id/measures', measureRoutes);
app.use('/stock/:id/stockUpdate', stockUpdateRoutes);
app.use('/reports', reportRoutes);




/**
 * Server Activation
 */
app.listen(port, () => {
	console.log('server is running')
});