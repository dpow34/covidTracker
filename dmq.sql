Vaccines Page
---------------------————————-
Show all Vaccines
SELECT vaccines.vaccineID, distributors.name AS distroName, vacType FROM vaccines INNER JOIN distributors ON distroName = distributors.distributorID;

Get distributorIDs & name
SELECT distributorID as id, name, status FROM distributors

Add Vaccine
INSERT INTO vaccines (vaccineID, distroName, vacType) VALUES (?,?,?)

Get Specific Vaccine
SELECT vaccineID as id, distroName, vacType FROM vaccines WHERE vaccineID = ?

Vaccine Search
"SELECT vaccines.vaccineID, distributors.name AS distroName, vacType FROM vaccines INNER JOIN distributors ON distroName = distributors.distributorID WHERE vaccineID = " + mysql.pool.escape(req.params.s);

Update Vaccine
UPDATE vaccines SET distroName=?, vacType=? WHERE vaccineID=?

Delete Vaccine
DELETE FROM vaccines WHERE vaccineID = ?


Clinics Page
---------------------————————-
Show all Clinics
SELECT clinicID, clinicName, address, parking, publicTransport, phone FROM clinics

Clinic Search
"SELECT clinicID, clinicName, address, parking, publicTransport, phone FROM clinics WHERE clinicName LIKE  " + mysql.pool.escape(req.params.s + '%');

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
Get clinicIDs & name
SELECT clinicID as id, clinicName FROM clinics

Show all Clinicians
SELECT clinicians.clinicianID, name, clinics.clinicName AS clinic, dob, sex, email, clinicians.phone, certification FROM clinicians INNER JOIN clinics ON clinic = clinics.clinicID

Clinician Search
"SELECT clinicians.clinicianID, name, clinics.clinicName AS clinic, dob, sex, email, clinicians.phone, certification FROM clinicians INNER JOIN clinics ON clinic = clinics.clinicID WHERE name LIKE " + mysql.pool.escape(req.params.s + '%');

Get Specific Clinic
SELECT clinicianID as id, clinic, name, dob, sex, email, phone, certification FROM clinicians WHERE clinicianID = ?

Add Clinician
INSERT INTO clinicians (clinicianID, clinic, name, dob, sex, email, phone, certification) VALUES (?,?,?,?,?,?,?,?)

Update Clinicians
UPDATE clinicians SET clinic=?, name=?, dob=?, sex=?, email=?, phone=?, certification=? WHERE clinicianID=?

Delete Clinician
DELETE FROM clinicians WHERE clinicianID = ?


Distributors Page
---------------------————————-
Show all Distributors
SELECT distributorID, name, status FROM distributors

Distributor Search
"SELECT distributorID, name, status FROM distributors WHERE name LIKE " + mysql.pool.escape(req.params.s + '%');

Add Distributor
INSERT INTO distributors (distributorID, name, status) VALUES (?,?, ?)

Delete Distributor
DELETE FROM distributors WHERE distributorID = ?


Patients Page
---------------------————————-
Get vaccineIDs & vacType
SELECT vaccineID as id, vacType FROM vaccines

Show all Patients
SELECT patients.patientID, vaccines.vacType as vaccine, name, dob, sex, email, phone FROM patients LEFT JOIN vaccines ON vaccine = vaccines.vaccineID

Patient Search
"SELECT patients.patientID, vaccines.vacType as vaccine, name, dob, sex, email, phone FROM patients LEFT JOIN vaccines ON vaccine = vaccines.vaccineID where name LIKE " + mysql.pool.escape(req.params.s + '%');

Get Specific Patient
SELECT patientID as id, vaccine, name, dob, sex, email, phone FROM patients WHERE patientID= ?

Add Patients
INSERT INTO patients (patientID, vaccine, name, dob, sex, email, phone) VALUES (?,?,?,?,?,?,?))

Update Patient
UPDATE patients SET vaccine=?, name=?, dob=?, sex=?, email=?, phone=? WHERE patientID=?

Delete Patient
DELETE FROM patients WHERE patientID = ?


Appointments Page
---------------------————————-
Get patientIDs & name
SELECT patientID as id, name FROM patients

Get clinicIDs & name
SELECT clinicID as id, clinicName FROM clinics

Show all Appointments
SELECT appointments.appointmentID, clinics.clinicName as clinic, patients.name as patient, vaccinePref, appointment FROM appointments INNER JOIN clinics on clinic = clinics.clinicID INNER JOIN patients on patient = patients.patientID

Appointment Search
"SELECT appointments.appointmentID, clinics.clinicName as clinic, patients.name as patient, vaccinePref, appointment FROM appointments INNER JOIN clinics on clinic = clinics.clinicID INNER JOIN patients on patient = patients.patientID WHERE appointmentID = " + mysql.pool.escape(req.params.s + '%');

Get Specific Appointment
SELECT appointmentID as id, clinic, patient, vaccinePref, appointment FROM appointments WHERE appointmentID = ?

Add Appointments
INSERT INTO appointments (appointmentID, clinic, patient, vaccinePref, appointment) VALUES (?,?,?,?,?)

Update Appointments
UPDATE appointments SET clinic=?, patient=?, vaccinePref=?, appointment=? WHERE appointmentID=?

Delete Appointment
DELETE FROM appointments WHERE appointmentID = ?