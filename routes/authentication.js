const express = require('express');
const auth_router  = express.Router();
const passport = require("passport");
const flash = require("connect-flash");
//const ensureLogin = require("connect-ensure-login"); 


//User model
const User = require ("../models/user");

//Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

auth_router.get("/signup", (req, res) => {
  res.render("authentication/signup");
});
auth_router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  // 1. Check username and password are not empty
  if (username === "" || password === "") {
    res.render("authentication/signup", {
      errorMessage: "Indicate username and password"
    });
    return;
  }
  User.findOne({ username })
    .then(user => {
      // 2. Check user does not already exist
      if (user) {
        res.render("authentication/signup", {
          errorMessage: "The username already exists"
        });
        return;
      }
      // Encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      //
      // Save the user in DB
      //
      const newUser = new User({
        username,
        password: hashPass
      });
      newUser
        .save()
        .then(user => res.redirect("/"))
        .catch(err => {
          next(err)
        });
    })
    .catch(err => next(err));
});




auth_router.get('/login', (req, res, next) => {
  res.render('authentication/login');
});


auth_router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

auth_router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/authentication/login",
  failureFlash: true
}));

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
  failureRedirect: "/authentication/login"
}));



module.exports = auth_router;