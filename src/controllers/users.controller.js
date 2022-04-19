const User = require('../models/user');
const passport = require('passport');
const userCtrl = {};


userCtrl.renderSignUpForm = (req, res) => res.render("nUsers/signup");

userCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  //console.log(req.body)
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("nUsers/signup", {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email:email});
    if(emailUser){
        req.flash('error_msg', 'the email is already in use');
        res.redirect('/users/signup');
    } else {
        const newUser = new User({email,password,name});
        newUser.password = await newUser.encrypPassword(password);
        await newUser.save();
        req.flash('success_msg', 'you are registered');
        res.redirect('/users/signin');
    }
    }
};

userCtrl.renderSigninForm = (req, res) => res.render("nUsers/signin");

userCtrl.signin = passport.authenticate("local", {
  successRedirect: "/notas",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

userCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/nUsers/signin");
};

module.exports = userCtrl;