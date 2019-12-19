/**
 * Required External Modules
 */
const 	express 			= require('express'),
		mongoose 			= require('mongoose'),
	  	passport			= require('passport'),
		path 				= require('path'),
		bodyParser 			= require('body-parser'),
	  	User				= require('./models/user'),
	  	LocalStrategy		= require('passport-local'),
	  	passportLocalMongose= require('passport-local-mongoose');

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
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


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




/**
 * Routes Definitions
 */
app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/home', isLoggedIn, (req, res) => {
	res.render('home')
});

// Auth routes

app.get('/register', (req, res) => {
	
	res.render('register');
});

//handing user sign up


app.post('/register', (req, res) => {

	let newUser = ({username: req.body.username});
	User.register(new User({
		username: req.body.username
	}), req.body.password, (err, user)=> {
		if(err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function() {
			res.redirect('/home');
		});
	});
});

// login routes
app.get('/login', (req, res)=>{
	res.render('login')
});

// login logic
app.post('/login', passport.authenticate('local', {
	successRedirect: '/home',
	failureRedirect: '/login'
}), (req, res) => {
	
});

// logout route
app.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/')
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/login')
};

/**
 * Server Activation
 */
app.listen(port, () => {
	console.log('server is runningnp')
});
