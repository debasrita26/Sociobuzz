const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment');
 
//tell passport  to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "590796045264-mafvqdof5vuk9tf4a7upaucvtm1ojdbi.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://sociobuzz.herokuapp.com/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){ console.log('error in google strategy passport',err); return ;}
        
            //console.log(profile);
        
            if(user) {
                return done(null,user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                if(err){ console.log('error in creating user',err); return ;}

                return done(null,user);
            });
        }
      });
    }

));

module.exports=passport;