const express = require('express');
const user_router  = express.Router();
const User = require ("../models/user");

user_router.get('/:id', (req, res, next) => {
  User.findOne({ username: req.params.id })
  .populate(trees)
  
  .then( user => {
    console.log(user)
    res.render('user/user', {user:user} )
  })
  .catch(next)
});

user_router.get('/:id/trees', (req, res, next) => {
  User.findOne({ username: req.params.id })
  .populate(trees)
  .then( user =>
    res.render('user/usertrees', {user:user} )
  )
  .catch(next)
});


module.exports = user_router;