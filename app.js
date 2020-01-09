require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

mongoose.connect('mongodb://localhost:27017/tree-trunks', {useNewUrlParser: true})

// When successfully connected
//mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));

// If the connection throws an error
//mongoose.connection.on('error', (err) =>  console.log(`Mongoose default connection error: ${err}`));

// When the connection is disconnected
//mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

const index_router = require('./routes/router');
app.use('/', index_router);

const auth_router = require('./routes/authentication');
app.use('/', auth_router);

const plant_router = require('./routes/plant');
app.use('/plant', plant_router);

const profile_router = require('./routes/profile');
app.use('/profile', profile_router);

const user_router = require('./routes/user');
app.use('/user', user_router);

module.exports = app;
