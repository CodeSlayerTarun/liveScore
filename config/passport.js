//THIS IS CONFIGURATION FILE OF PASSPORT
//PASSPORT AND PASSPORT STRATEGY
//PASSPORT AND PASSPORT STRATEGY
var passport = require('passport');
var SignUpModel = require('../models/user_admin');
var LocalStrategy = require('passport-local').Strategy;//passport's local strategy

//configuring passport
passport.serializeUser(function(signupuser, done) { //serialize tells how to store user info
    done(null, signupuser.id); //serialize by id
})

//DESIRALIZING USER
passport.deserializeUser(function(id, done) {
    SignUpModel.findById(id, function(err, signupuser){ //finding user by id in mongoDB
        done(err, signupuser);
    });
});
/* 
above configurations tells passport that, this allows passport to store user in the session
or store the id in the session and retrieve it whenever needed    
*/
//MIDDLEWARE
passport.use('local.signup', new LocalStrategy({ 
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true  
    },
     function(req, email, password, done){
         //VALIDATING ALL THE USER INPUTS HERE (EXPRESS-VALIDATORS)
         req.checkBody('email', 'Invalid email').notEmpty().isEmail();
         req.checkBody('password','Invalid password').notEmpty().isLength({min:4})
         //by now the validator will only check the errors but it will not take any action, for that next:
         var errors = req.validationErrors();
         if (errors){
             var messages = [];
             errors.forEach(function(error){
                 messages.push(error.msg);
             });
             return done(null, false, req.flash('error', messages)) //handling the validation errors
         }
         SignUpModel.findOne({'email': email}, function(err, signupuser){
             if(err){
                 return done(err)
             }
             if(signupuser){
                 return done(null, false, {message: 'Email is already in use'})
             }
             var newUser = new SignUpModel();
             newUser.email = email
             newUser.password = newUser.encryptPassword(password)
             newUser.save(function(err, result){
                 if(err){
                    return done(err)
                 }
                 return done(null, newUser);
             })
            })
     }))


// ** SIGNIN STRATEGY ** //
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, function(req, email, password, done){
    //validation chack
    req.checkBody('email', 'Invalid email.').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password.').notEmpty();
    var errors = req.validationErrors();
    if (errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages))
    }
    if ( !(email == 'as@gmail.com' || email == 'tarun20@gmail.com')){
        var messages = ['No user other than admin allowed here.'];
        return done(null, false, req.flash('error', messages))
    }
    SignUpModel.findOne({'email': email}, function(err, signupuser){
        if(err){
            return done(err);
        }
        if(!signupuser){
            return done(null, false, {message: 'No such user allowed.'})
        }
        if(!signupuser.validPassword(password)){
            return done(null, false, {message: 'You entered wrong password, try again.'});
        }
        return done(null, signupuser);    
    })
    }))