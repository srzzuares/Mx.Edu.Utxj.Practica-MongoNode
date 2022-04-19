const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async (email,password,done) =>{
    const userss = await User.findOne({email})
    if(!userss){
        return done(null,false,{message:'Not user found'});
    }else {
        const match = await userss.matchPassword(password);
        if(match){
            return done(null,userss);
        }else {
            return done(null,false,{message:'incorrect password'});
        }
    }
}));

passport.serializeUser((userss, done) => {
    done(null, userss.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, userss) => {
      done(err, userss);
    });
  });
