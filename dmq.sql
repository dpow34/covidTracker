Vaccines Page
---------------------————————-
Show all Vaccines
SELECT vaccineID, manufactID, pfizer, moderna, johnson FROM vaccines;

Get manufactIDs
SELECT manufactID as id FROM manufacturers

Add Vaccine
INSERT INTO vaccines (vaccineID, manufactID, pfizer, moderna, johnson) VALUES (?,?,?,?,?)

Get Specific Vaccine
SELECT vaccineID as id, manufactID, pfizer, moderna, johnson FROM vaccines WHERE vaccineID = ?

Vaccine Search
"SELECT vaccineID as vaccineID, manufactID, pfizer, moderna, johnson FROM vaccines WHERE vaccineID = " + mysql.pool.escape(req.params.s)

Update Vaccine
UPDATE vaccines SET manufactID=?, pfizer=?, moderna=?, johnson=? WHERE vaccineID=?

Delete Vaccine
DELETE FROM vaccines WHERE vaccineID = ?


Clinics Page
---------------------————————-
Show all Clinics
SELECT clinicID, clinicName, address, parking, publicTransport, phone FROM clinics

Clinic Search
"SELECT clinicID, clinicName, address, parking, publicTransport, phone FROM clinics WHERE clinicName LIKE  " + mysql.pool.escape(req.params.s + '%')

Get Specific Clinic
SELECT clinicID as id, clinicName, address, parking, publicTransport, phone FROM clinics WHERE clinicID = ?

Add Clinic
INSERT INTO clinics (clinicID, clinicName, address, parking, publicTransport, phone) VALUES (?,?,?,?,?,?)

Update Clinics
UPDATE clinics SET clinicName=?, address=?, parking=?, publicTransport=?, phone=? WHERE clinicID=?

Delete Clinic
DELETE FROM clinics WHERE clinicID = ?


Clinicians Page
---------------------————————-
Get clinicIDs
SELECT clinicID as id FROM clinics

Show all Clinicians
SELECT clinicianID, clinicID, name, dob,sex, email, phone, certification FROM clinicians

Clinician Search
"SELECT clinicianID, clinicID, name, dob, sex, email, phone, certification FROM clinicians WHERE name LIKE " + mysql.pool.escape(req.params.s + '%');

Get Specific Clinic
SELECT clinicianID as id, clinicID, name, dob, sex, email, phone, certification FROM clinicians WHERE clinicianID = ?

Add Clinician
INSERT INTO clinicians (clinicianID, clinicID, name, dob, sex, email, phone, certification) VALUES (?,?,?,?,?,?,?,?)

Update Clinicians
UPDATE clinicians SET clinicID=?, name=?, dob=?, sex=?, email=?, phone=?, certification=? WHERE clinicianID=?

Delete Clinician
DELETE FROM clinicians WHERE clinicianID = ?


Manufacturers Page
---------------------————————-
Show all Manufacturers
SELECT manufactID, administered FROM manufacturers

Manufacturer Search
"SELECT manufactID, administered FROM manufacturers WHERE manufactID = " + mysql.pool.escape(req.params.s)"

Add Manufacturer
INSERT INTO manufacturers (manufactID, administered) VALUES (?,?)

Delete Manufacturer
DELETE FROM manufacturers WHERE manufactID = ?


Patients Page
---------------------————————-
Get vaccineIDs
SELECT vaccineID as id FROM vaccines

Show all Patients
SELECT patientID, vaccineID, name, dob, sex, email, phone FROM patients

Patient Search
"SELECT patientID, vaccineID, name, dob, sex, email, phone FROM patients WHERE name LIKE " + mysql.pool.escape(req.params.s + '%')

Get Specific Patient
SELECT patientID as id, vaccineID, name, dob, sex, email, phone FROM patients WHERE patientID= ?

Add Patients
INSERT INTO patients (patientID, vaccineID, name, dob, sex, email, phone) VALUES (?,?,?,?,?,?,?)

Update Patient
UPDATE patients SET vaccineID=?, name=?, dob=?, sex=?, email=?, phone=? WHERE patientID=?

Delete Patient
DELETE FROM patients WHERE patientID = ?


Appointments Page
---------------------————————-
Get patientIDs
SELECT patientID as id FROM patients

Get clinicIDs
SELECT clinicID as id FROM clinics

Show all Appointments
SELECT appointmentID, clinicID, patientID, vaccinePref, appointment FROM appointments

Appointment Search
"SELECT appointmentID, clinicID, patientID, vaccinePref, appointment FROM appointments WHERE appointmentID = " + mysql.pool.escape(req.params.s + '%')

Get Specific Appointment
SELECT appointmentID as id, clinicID, patientID, vaccinePref, appointment FROM appointments WHERE appointmentID = ?

Add Appointments
INSERT INTO appointments (appointmentID, clinicID, patientID, vaccinePref, appointment) VALUES (?,?,?,?,?)

Update Appointments
UPDATE appointments SET clinicID=?, patientID=?, vaccinePref=?, appointment=? WHERE appointmentID=?

Delete Appointment
DELETE FROM appointments WHERE appointmentID = ?