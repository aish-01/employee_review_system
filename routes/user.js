const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/userController');

// to render homepage/signin page
router.get('/',userController.home);

// to render the signup page
router.get('/sign-up',userController.signUp);

// to render sign out page
router.get('/signout',userController.signout);

//to sign in a user/creating session

router.post('/create-session',
// using passport for authentication
passport.authenticate('local',
// if signing in fails
{failureRedirect:'/'}),

userController.createSession);

// creating a new user
router.post('/create-account',userController.createAccount);

module.exports = router;