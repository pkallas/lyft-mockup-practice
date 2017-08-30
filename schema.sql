DROP DATABASE IF EXISTS drive_by;
CREATE DATABASE drive_by;

\c drive_by

CREATE TABLE drivers (
  driver_id  SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  car VARCHAR(50) NOT NULL,
  drivers_license VARCHAR(250) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  last_transaction TIMESTAMP
);

CREATE TABLE riders (
  rider_id  SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  payment_id  SERIAL NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  last_transaction TIMESTAMP
);

CREATE TABLE payment_info (
  payment_id  SERIAL PRIMARY KEY ,
  card_number INTEGER UNIQUE,
  card_zip INTEGER,
  card_cvv INTEGER,
  card_exp INTEGER,
  card_type TEXT
);

ALTER TABLE riders ADD FOREIGN KEY (payment_id) REFERENCES payment_info (payment_id);
