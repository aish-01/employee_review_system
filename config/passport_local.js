const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

const User = require('../models/User');

// creating new local strategy
passport.use(new LocalStrategy(
    // reading username as email
    {
        usernameField:'email'
    },
    async(email,password,done)=>{

        const user = await User.findOne({email:email})

        if(user){
            // compares user password with password in database
            const found = await bcrypt.compare(password,user.password);

            if(!found){
                return done(null,false,{message:'Incorrect Password'});
            }

            return done(null,user);
        }

        else{
            return done(null,false,{message:'Incorrect username'});
        }
    }
));

// storing the user information in the session
passport.serializeUser(function(user,done){
    return done(null,user.id);
})

// retrieving user information from the session
passport.deserializeUser(async function(id,done){
     const user = await User.findById(id);

     if(!user){
        return done(new Error('User not found'));
     }

     return done(null,user);
})

// check whether the user is authenticated or not
passport.checkAuthentication = function(req,res,next){
    // check if user is signed in or not
    // if user is signed in then pass the request to the next function/action in controller
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/');
}

// sending user data to local for view
passport.setAuthenticatedUser = function(req,res,next){
    // check if user is signed in or not
    // if user is signed in then sending current signed in user's data(req.user) to locals for views(res.local.user)
    if(req.isAuthenticated()){
       res.locals.user = req.user;
    }
    return next();
}

// checking whether the logged in user is admin or not
passport.isAdmin = function(req,res,next){
    if(req.user.role === 'Admin'){
        return next();
    }
    return res.redirect('back');
}

// checking whether the logged in user is an employee
passport.isEmployee = function(req,res,next){
    if(req.user.role === 'Employee'){
        return next();
    }

    return res.redirect('back');
}

module.exports = passport;