// Load dependencies
var http = require("http");
var fs = require('fs');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sqlite3 = require('sqlite3').verbose();

var app = express();

var router = express.Router();
var local_host_port_number = 8888;
var port = process.env.PORT || local_host_port_number;

// Other variables


// Database configuration
var db = new sqlite3.Database('tempus_db.db');

// Configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'bower_components')));
app.use(morgan('dev'));

// Passport info
app.use(session({secret: 'fentonisthebestdog'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// Routes
// app.use('/', router);
// require('./controllers/routes')(app, passport);

// //========= Errors
// app.get('/error', function(req,res) {
//   res.render('error.ejs', {title: 'Error!'});
// });

//========= Login
// Get
app.get('/login', function(req,res) {

  res.render('login.ejs',{title: 'Login',
    categories: [{menu_name: 'Sports', link: 'sports'}, {menu_name: 'Politics', link: 'politics'}, {menu_name: 'Economy', link: 'economy'}, {menu_name: 'Business', link: 'business'}],
    post_content: [{content: 'Hello world', content_type: 'p'}]});

});

// Post
app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

//========= FOR USE BY DOCTORS
// Main Doctor Page
app.get('/doctor', function(req, res) {

  db.all("SELECT * FROM patient_information", function(err, result) {

    if(err){
      return console.error('error', err)
    }

    // Render view
    res.render('doctor/doctor.ejs', {
      title: 'Doctor Portal',
      patients: result
    });

  });

});

// Get patient information
app.get('/patient_information/:patient_id', function(req, res) {

  var patient_id = req.params['patient_id'];

  db.all("SELECT * FROM patient_information WHERE patient_id = (?)", patient_id, function(err, result) {

    if(err){
      return console.error('error', err)
    }

    // Render view
    res.render('doctor/doctor_patient_information.ejs', {
      title: 'Doctor Portal',
      patient: result,
      patient_first_name : result[0].patient_first_name,
      patient_last_name : result[0].patient_last_name,
      patient_id: patient_id
    });

  });

});

// Get patient information
app.get('/new_appointment', function(req, res) {

  db.all("SELECT * FROM patient_information", function(err, result) {

    if(err){
      return console.error('error', err)
    }

    // Render view
    res.render('doctor/new_appointment.ejs', {
      title: 'Doctor Portal',
      patients: result
    });

  });

});

// Create new appointment
app.post('/create_new_appointment', function(req, res) {
  var patient_id = req.body.patient_id;
  var appointment_date = req.body.appointment_date;
  var doctor_note = req.body.doctor_note;

  db.run("INSERT INTO appointment_information (patient_id, doctor_id, appointment_datetime, appointment_purpose) VALUES (?, ?, ?, ?)", [patient_id, 1, appointment_date, doctor_note], function(err) {
    if(err !== null) {
      next(err);
    }
    else {
      res.redirect('/doctor');
    }
  });

});

////========= FOR USE BY PATIENTS
// Main Patient Page
app.get('/patient/my_information/:patient_id', function(req, res) {

  var patient_id = req.params['patient_id'];

  db.all("SELECT * FROM patient_information WHERE patient_id = (?)", patient_id, function(err, result) {

    if(err){
      return console.error('error', err)
    }

    // Render view
    res.render('patient/patient.ejs', {
      title: 'Patient Portal',
      patient: result,
      patient_first_name : result[0].patient_first_name,
      patient_last_name : result[0].patient_last_name,
      patient_id: patient_id
    });

  });
});


// 404 Middleware
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// Error-handler middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port);
console.log("Server running on http://127.0.0.1:" + port + "/")
