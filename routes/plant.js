const express = require('express');
const plant_router  = express.Router();
const uploadCloud = require('../config/cloudinary.js'); 
const userTree = require('../models/usertree.js');

plant_router.get('/', (req, res, next) => {
  res.render('plant/plant');
});

plant_router.post('/', uploadCloud.single('photo'), (req, res, next) => {
  const { image,name,family,description,creator,country } = req.body;
  const newTree = new userTree({image,name,family,description,creator,country});
  newTree.save()
    .then(res.redirect('/plant/confirmation'))
    .catch(error => {
      next(error);
    })
  ;
});

plant_router.get('/confirmation', (req, res, next) => {
  res.render('plant/confirmation');
});

module.exports = plant_router;