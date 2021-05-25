SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS clinics;
DROP TABLE IF EXISTS clinicians;
DROP TABLE IF EXISTS manufacturers;
DROP TABLE IF EXISTS vaccines;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS appointments;
SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE clinics (
  clinicID int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  clinicName varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  parking varchar(255),
  publicTransport varchar(255),
  phone varchar(255)
);


CREATE TABLE clinicians (
  clinicianID int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  clinicID int(11) not NULL,
  name varchar(255) NOT NULL,
  dob varchar(255) NOT NULL,
  sex varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phone varchar(255) NOT NULL,
  certification varchar(255) NOT NULL,
  FOREIGN KEY (clinicID) REFERENCES clinics (clinicID)
  ON DELETE CASCADE
);


CREATE TABLE manufacturers (
  manufactID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  administered varchar(255) NOT NULL
);


CREATE TABLE vaccines (
  vaccineID int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  manufactID int(11) NOT NULL,
  pfizer varchar(255),
  moderna varchar(255),
  johnson varchar(255),
  FOREIGN KEY (manufactID) REFERENCES manufacturers (manufactID)
  ON DELETE CASCADE
);


CREATE TABLE patients (
  patientID int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  vaccineID int(11),
  name varchar(255) NOT NULL,
  dob varchar(255) NOT NULL,
  sex varchar(255) NOT NULL,
  email varchar(255),
  phone varchar(255),
  FOREIGN KEY (vaccineID) REFERENCES vaccines (vaccineID)
  ON DELETE CASCADE
);


CREATE TABLE appointments (
  appointmentID int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  clinicID int(11) NOT NULL,
  patientID int(11) NOT NULL,
  vaccinePref varchar(255),
  appointment varchar(255) NOT NULL,
  FOREIGN KEY (clinicID) REFERENCES clinics (clinicID) ON DELETE CASCADE,
  FOREIGN KEY (patientID) REFERENCES patients (patientID)
  ON DELETE CASCADE
);


INSERT INTO clinics (clinicID, clinicName, address, parking, publicTransport, phone)
VALUES
  (00001, 'Smith Health Clinic', '111 North Maple St., Miami, FL 33101', 'True', 'True', '569-895-4859'),
  (00002, 'Freds Drug Store', '134 South Walnut, Denver, CO 80014', 'False', 'True', '358-097-4532'),
  (00003, 'Safe Medicine', '999 Barker, Seattle, WA 98101', 'True', NULL ,'198-333-4862');


INSERT INTO clinicians (clinicianID, clinicID, name, dob, sex, email, phone, certification)
VALUES
  (0001, 00003, 'Megan Smith', '09-18-1994', 'Female', 'meg123@aol.com','123-555-1265', 'True'),
  (0002, 00002, 'Jill Moore', '12-13-1985', 'Female', 'jill12@yahoo.com','595-345-1178', 'True'),
  (0003, 00001, 'Robert Burt', '08-08-1970', 'Male' , 'robbie11@gmail.com','222-453-2354', 'False');


INSERT INTO manufacturers (manufactID, administered)
VALUES
  (1, 'True'),
  (2, 'True'),
  (3, 'True'),
  (4, 'False');


INSERT INTO vaccines (vaccineID, manufactID, pfizer, moderna, johnson)
VALUES
  (0000001, 1, 'True', 'False', 'False'),
  (0000002, 3, 'False', 'False', 'True'),
  (0000003, 2, 'True', 'False', 'False'),
  (0000004, 4, 'False', 'True', 'False');
 
INSERT INTO patients (patientID, vaccineID, name, dob, sex, email, phone)
VALUES
  (0000001, 0000003, 'Peyton Elliot', '05-05-1973', 'Male', 'peyton333@yahoo.com','578-555-7654'),
  (0000002, 0000002, 'Margie Lee', '12-25-2000', 'Female', 'marg12@yahoo.com','595-555-1111'),
  (0000003, 0000001, 'Mindy Gomez', '08-01-1954', 'Female' , 'mindyg54@gmail.com','222-555-1234');


INSERT INTO appointments (appointmentID, clinicID, patientID, vaccinePref, appointment)
VALUES
  (00001, 00001, 00003, 'Pfizer', '10:00 AM'),
  (00002, 00002, 00001, NULL, '1:15 PM'),
  (00003, 00003, 00002, 'Johnson', '8:00 AM');









