const express = require('express');
const profile_router  = express.Router();
const userTree = require('../models/usertree')
const ensureLogin = require("connect-ensure-login");
const User = require ("../models/user");

//profile_router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
//  res.render('profile/myprofile', {user: req.user });
//});
// autre méthode

profile_router.get("/", (req, res) => {
  if (!req.user) {
    res.redirect('/login'); // not logged-in
    return;
  }
  
  // ok, req.user is defined
  res.render("profile/myprofile", { user: req.user });
});

profile_router.get('/mytrees', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  userTree.find()
        .then(usertree => res.render('profile/mytrees',{user: req.user, usertree}))
        .catch(error => console.log('Error while getting tree from the DB: ', error))
});

// route edit profile
profile_router.get('/edit', (req, res, next) => {
  res.render('profile/editprofile')
});

profile_router.post('/edit', (req, res) => {

  // à débugger pour mettre à jour les users avec edituser
    console.log(req.user);
  User.update({_id: req.user._id}, { $set: {
  username: req.body.username
  //       firstname,
  //       lastname,
  //       email,
  //       password
 }}, { new: true })
  //     .then(
 res.render('profile/myprofile')}) // exposer user lien avec db 
  //   )

      
  // .catch ((error) => {
  //   next(error)
  // })});

module.exports = profile_router;