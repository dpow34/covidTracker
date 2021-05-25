$ = variable


Vaccines Page
---------------------————————-
Show all Vaccines
SELECT vaccineID, manufactID, pfizer, moderna, johnson
FROM vaccines;


Add Vaccine
INSERT INTO vaccines (manufactID, pfizer, moderna, johnson)
VALUES ($manufactIDInput, $pfizerInput, $modernaInput, $johnsonInput);


Update Vaccines
UPDATE vaccines
SET 
manufactID = $manufactIDInput,
pfizer = $pfizerInput,
moderna = $modernaInput,
johnson = $johnsonInput
WHERE 
vaccineID = $vaccineID;


Delete Vaccine
DELETE FROM vaccines
WHERE vaccineID = $vaccineID;


Clinics Page
---------------------————————-
Show all Clinics
SELECT clinicID, clinicName, address, parking, publicTransport, phone 
FROM clinics;


Add Clinic
INSERT INTO clinics (clinicName, address, parking, publicTransport, phone)
VALUES ($clinicNameInput, $addressInput, $parkingInput, $publicTransportInput, $phoneInput);


Update Clinics
UPDATE clinics
SET 
clinicName = $clinicNameInput,
address = $addressInput,
parking = $parkingInput,
publicTransport = $publicTransportInput,
phone = $phoneInput
WHERE 
clinicID = $clinicID;


Delete Clinic
DELETE FROM clinics
WHERE clinicID = $clinicID;


Clinicians Page
---------------------————————-
Show all Clinicians
SELECT clinicianID, clinicID, name, dob,sex, email, phone, certification
FROM clinicians;


Add Clinician
INSERT INTO clinicians (clinicID, name, dob,sex, email, phone, certification)
VALUES ($clinicIDInput, $nameInput, $dobInput, $sexInput, $emailInput, $phoneInput, $certificationInput);


Update Clinicians
UPDATE clinicians
SET 
clinicID = $clinicIDInput,
name= $nameInput,
dob = $dobInput,
sex = $sexInput,
email = $emailInput,
phone = $phoneInput,
certification = $certificationInput
WHERE 
clinicianID = $clinicianID;


Delete Clinician
DELETE FROM clinicians
WHERE clinicianID = $clinicianID;


Manufacturers Page
---------------------————————-
Show all Manufacturers
SELECT manufactID, administered
FROM manufacturers;


Add Manufacturer
INSERT INTO manufacturers(administered)
VALUES ($administeredInput);


Update Manufacturers
UPDATE manufacturers
SET 
administered = $administeredInput
WHERE 
manufactID = $manufactID;


Delete Manufacturer
DELETE FROM manufacturers
WHERE manufactID = $manufactID;


Patients Page
---------------------————————-
Show all Patients
SELECT patientID, vaccineID, name, dob, sex, email, phone
FROM patients;


Add Patients
INSERT INTO patients(vaccineID, name, dob, sex, email, phone)
VALUES ($vaccineIDInput, $nameInput, $dobInput, $sexInput, $emailInput, $phoneInput);


Update Patient
UPDATE patients
SET 
vaccineID = $vaccineIDInput,
name= $nameInput,
dob = $dobInput,
sex = $sexInput,
email = $emailInput,
phone = $phoneInput
WHERE 
patientID = $patientID;


Delete Patient
DELETE FROM patients
WHERE patientID = $patientID;


Appointments Page
---------------------————————-
Show all Appointments
SELECT appointmentID, clinicID, patientID, vaccinePref, appointment
FROM appointments;


Add Appointments
INSERT INTO appointments(clinicID, patientID, vaccinePref, time)
VALUES ($clinicIDInputFromDropDown, $patientIDInputFromDropDown, $vaccinePrefInput, $timeInputFromDropDown);


Update Appointments
UPDATE appointments
SET 
clinicID = $clinicIDInputFromDropDown,
patientID = $patientIDInputFromDropDown,
vaccinePref = $vaccinePrefInput,
time = $timeInputFromDropDown
WHERE 
appointmentID = $appointmentID;


Delete Appointment
DELETE FROM appointments
WHERE appointmentID = $appointmentID;