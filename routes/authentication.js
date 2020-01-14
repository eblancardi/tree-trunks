const express = require('express');
const auth_router  = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js'); 

// User model
const User = require("../models/user");

//Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//routes login et signup
auth_router.get('/login', (req, res, next) => {
  res.render('authentication/login', { "message": req.flash("error")});
});

auth_router.post("/login", (passport.authenticate("local", {
  successRedirect: "/",
  successRedirect: "/login",
  failureFlash: true,
  passReqToCallBack: true
})));

auth_router.get('/login', (req, res, next) => {
  res.render('authentication/login', 
  { "message": req.flash("error")});
});

auth_router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username === "" || password === "" || email === "") {
    res.render('authentication/login', {message : "Indicate username and password"});
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("authentication/login", { message: "The username already exists !" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username, 
      password: hashPass,
      email,
    });

    newUser.save((err)=> {
      if (err) {
        console.log(err);
        res.render("authentication/login", { message: "Something went wrong !" });
        } else {
          res.redirect("/");
        }      
      });
  })
  .catch(error => {
    next(error)
  })
});

// route logout
auth_router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

// route private page

auth_router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render ("private", {user: req.user });
});

auth_router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);


auth_router.get("/auth/google", passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}));
auth_router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/profile", // define the route to be redirected to
  failureRedirect: "/authentication"
}));

module.exports = auth_router;