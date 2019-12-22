const express 	= require('express'),
	  router 	= express.Router(),
	  passport	= require('passport'),
	  User 		= require('../models/user');

/**
 * Routes Definitions
 */
router.get('/', (req, res) => {
	res.render('landing');
});


// Auth routes

router.get('/register', (req, res) => {
	
	res.render('register');
});

//handing user sign up


router.post('/register', (req, res) => {

	let newUser = ({username: req.body.username});
	User.register(new User({
		username: req.body.username
	}), req.body.password, (err, user)=> {
		if(err) {
			req.flash("error", err.message);
  			return res.redirect("/register");
		}
		passport.authenticate('local')(req, res, function() {
			req.flash("success", "Welcome to iVe Stock " + user.username)
			res.redirect('/home');
		});
	});
});

// login routes
router.get('/login', (req, res)=>{
	res.render('login')
});

// login logic
router.post('/login', passport.authenticate('local', {
	successRedirect: '/home',
	failureRedirect: '/login'
}), (req, res) => {
	
});

// logout route
router.get('/logout', (req, res)=>{
	req.logout();
	req.flash("success", "See you soon friend!")
	res.redirect('/')
});

module.exports = router;
