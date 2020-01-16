require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require("passport");
const User         = require("./models/user");
const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

mongoose.connect('mongodb://localhost:27017/tree-trunks', {useNewUrlParser: true});

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

app.use(flash());


app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
  if (err) { return cb(err);}
  cb (null, user);
  });
});

passport.use(new LocalStrategy(
  {passReqToCallback: true},
  (...args) => {
    const [req,,, done] = args;

    const {username,email,password} = req.body;

    User.findOne({username}||{email})
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username or email" });
        }
          
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
    
        done(null, user);
      })
      .catch(err => done(err))
    ;
  }
));

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

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.use(
  new GoogleStrategy(
    {
      clientID: "61416855395-pmc18hto9ol6l2ccvlcl3160ka9e3t1i.apps.googleusercontent.com",
      clientSecret: "w7_02FNat43ephLfb9dLlN6k", 
      callbackURL: "/auth/google/callback"
    },

    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      console.log("Google account details:", profile);

      User.findOne({ googleID: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({ googleID: profile.id, username: profile.displayName, firstname: profile.name.givenName, lastname:profile.name.familyName, email: profile.emails[0].value, avatar: profile.photos[0].value})
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err))
          ;
        })
        .catch(err => done(err))
      ;
    }
  )
);

module.exports = app;
