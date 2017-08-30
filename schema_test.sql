DROP DATABASE IF EXISTS drive_by_test;
CREATE DATABASE drive_by_test;

\c drive_by_test

DROP TABLE IF EXISTS drivers;
CREATE TABLE drivers (
  driver_id  SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  car VARCHAR(50) NOT NULL,
  drivers_license VARCHAR(250) NOT NULL,
  phone_number VARCHAR(250) NOT NULL
);

DROP TABLE IF EXISTS riders;
CREATE TABLE riders (
  rider_id  SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  payment_id  SERIAL NOT NULL,
  phone_number VARCHAR(250) NOT NULL
);

DROP TABLE IF EXISTS payment_info;
CREATE TABLE payment_info (
  payment_id SERIAL PRIMARY KEY,
  card_number VARCHAR(250) UNIQUE,
  card_zip INTEGER,
  card_cvv INTEGER,
  card_exp VARCHAR(250),
  card_type TEXT
);
