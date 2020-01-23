const express = require('express');
const profile_router  = express.Router();
const userTree = require('../models/usertree')
const ensureLogin = require("connect-ensure-login");
const User = require ("../models/user");
const uploadCloud = require('../config/cloudinary.js');

//profile_router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
//  res.render('profile/myprofile', {user: req.user });
//});
// autre méthode

profile_router.get("/", (req, res, next) => {
  console.log (req.user)
  if (!req.user) {
    res.redirect('/login'); // not logged-in
    return;
  }
  
  // ok, req.user is definedPROGRESS
  res.render("profile/myprofile", { user: req.user });
});

profile_router.get('/mytrees', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    userTree.find({ creatorID: req.user._id })
    .then(trees => {
      console.log(trees);
      res.render('profile/mytrees',{user: req.user, usertree: trees})})
    .catch(next)
  })


//   userTree.find()
//         .then(usertree => {
//           console.log(req.user)
//           res.render('profile/mytrees',{user: req.user, usertree: req.user.trees})})
//         .catch(error => console.log('Error while getting tree from the DB: ', error))
// });

// route edit profile
profile_router.get('/edit', (req, res, next) => {
  res.render('profile/editprofile',{ user: req.user })
});

profile_router.post('/edit', uploadCloud.single('photo'), (req, res,next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }

if (req.file){
  req.user.avatar = req.file.url;
  User.findByIdAndUpdate(req.user._id, { $set: {avatar: req.user.avatar, email:req.user.email} }, {new:true})
//req.user.save()
    .then(res.redirect(req.originalUrl))
   // return
  .catch(next);
};
if (req.body.email!==req.user.email){
  req.user.email=req.body.email;
  User.findByIdAndUpdate(req.user._id, { $set: {email: req.user.email} }, {new:true})
//req.user.save()
  .then(res.redirect(req.originalUrl)
  ).catch(next);
};

})

profile_router.post('/', (req, res, next) => {
  User.findByIdAndRemove(req.user.id)
    .then(res.redirect('/'))
    .catch(err => next(err));
});
// User.deleteOne({ name: "Alice"})
//   .then(successCallback)
//   .catch(errorCallback);

module.exports = profile_router;