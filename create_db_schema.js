var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tempus_db.db');

// db.serialize(function() {
//
//   db.run("CREATE TABLE if not exists patient_information (patient_id INTEGER, username TEXT, patient_first_name TEXT, patient_last_name TEXT, patient_age INTEGER, patient_email TEXT, patient_street_address TEXT, patient_city TEXT, patient_state TEXT, patient_zip_code TEXT, patient_phone_number TEXT)");
//   db.run("CREATE TABLE if not exists doctor_information (doctor_id INTEGER, username TEXT, doctor_first_name TEXT, doctor_last_name TEXT)");
//   db.run("CREATE TABLE if not exists appointment_information (appointment_id INTEGER PRIMARY KEY, patient_id INTEGER, doctor_id INTEGER, appointment_datetime TEXT, appointment_purpose TEXT)");
//   db.run("CREATE TABLE if not exists user_info (username TEXT, password TEXT, doctor_patient TEXT)");
//
//   db.run("CREATE UNIQUE INDEX patient_idx ON patient_information(patient_id);");
//   db.run("CREATE UNIQUE INDEX doctor_idx ON doctor_information(doctor_id);");
//   db.run("CREATE UNIQUE INDEX appointment_idx ON appointment_information(appointment_id);");
//
// });

// db.run(`INSERT into patient_information(
//   patient_id,
//   username,
//   patient_first_name,
//   patient_last_name,
//   patient_age,
//   patient_email,
//   patient_street_address,
//   patient_city,
//   patient_state,
//   patient_zip_code,
//   patient_phone_number
// ) VALUES (
//   2,
//   'kbryant',
//   'Kris',
//   'Bryant',
//   '25',
//   'kb17@gmail.com',
//   '1060 W Addison St',
//   'Chicago',
//   'IL',
//   '60613',
//   '123-456-7890')`);

// db.run(`INSERT INTO doctor_information (
//   doctor_id,
//   username,
//   doctor_first_name,
//   doctor_last_name
// ) VALUES (
//   2,
//   'mark_green',
//   'Mark',
//   'Green'
// )`);

db.each("SELECT * FROM appointment_information", function(err, row) {
    console.log(row);
});

db.close();
