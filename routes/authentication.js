const express = require('express');
const auth_router  = express.Router();
const passport = require("passport");
//User model
const User = require ("../models/user");

//Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

//routes login et signup
auth_router.get('/login', (req, res, next) => {
  res.render('authentication/login', { "message": req.flash("error")});
});

auth_router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true 
}));

auth_router.get("/signup", (req, res) => {
  res.render("authentication/signup");
});

auth_router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;
  const email = req.body.email;

  if (username === "" || password === "" || email === "") {
    res.render('authentication/signup', {message : "All fields are mandatory"});
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("authentication/signup", { message: "The username already exists !" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username, 
      firstname,
      lastname,
      email,
      password: hashPass
    });

    newUser.save((err)=> {
      if (err) {
        console.log(err);
        res.render("authentication/signup", { message: "Something went wrong !" });
        } else {
          res.redirect("/profile");
        }      
      });
  })
  .catch(error => {
    next(error)
  })
})

auth_router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
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

auth_router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/profile", // define the route to be redirected to
  failureRedirect: "/authentication/login"
}));

module.exports = auth_router;