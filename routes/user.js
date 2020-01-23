const express = require('express');
const user_router  = express.Router();
const User = require ("../models/user");
const userTree = require('../models/usertree')


user_router.get('/:id', (req, res, next) => {
  User.findOne({ username: req.params.id })
  .then(user => {
    userTree.find({ creatorID: user._id })
    .then(trees => {
      console.log(trees);
    res.render('user/user', {user:user, trees:trees} )})
    .catch(next)
  })
  .catch(next)
});

// user_router.get('/:id/trees', (req, res, next) => {
//   userTree.find({ creatorID: req.params.id })
//   .then( trees =>
//     res.render('user/usertrees', {trees} )
//   )
//   .catch(next)
// });


module.exports = user_router;