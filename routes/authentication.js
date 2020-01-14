const express = require('express');
const auth_router  = express.Router();
const passport = require("passport");
const flash = require("connect-flash");
const User = require ("../models/user");
const bcrypt = require("bcryptjs");




auth_router.get('/login', (req, res, next) => {
  res.render('authentication/login');
});

auth_router.get('/signup', (req, res, next) => {
  res.render('authentication/signup');
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