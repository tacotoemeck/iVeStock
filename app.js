/**
 * Required External Modules
 */
const 	express 			= require('express'),
		mongoose 			= require('mongoose'),
	  	flash 				= require('connect-flash'),
	  	passport			= require('passport'),
		path 				= require('path'),
		bodyParser 			= require('body-parser'),
	  	User				= require('./models/user'),
	  	LocalStrategy		= require('passport-local'),
	  	passportLocalMongose= require('passport-local-mongoose'),
		middleware			= require('./middleware');

const authRoutes 			= require('./routes/auth'),
	  stockRoutes			= require('./routes/stock');

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

console.log(process.env.DATABASEURL)

mongoose.connect('mongodb://localhost/iVeStock', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('connecting to database successful'))
.catch(err => console.error('could not connect to mongo DB', err));

app.use(require('express-session')({
	secret: "no secret here",
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(flash());


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

app.use(function(req, res, next){
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next()
});

app.get('/home', middleware.isLoggedIn, (req, res) => {
	res.render('home')
});

app.use(authRoutes);
app.use('/stock', stockRoutes);


/**
 * Server Activation
 */
app.listen(port, () => {
	console.log('server is running')
});