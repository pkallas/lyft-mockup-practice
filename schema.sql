DROP DATABASE IF EXISTS Drive_By;
CREATE DATABASE Drive_By;

\c Drive_By

CREATE TABLE "drivers" (
"driver_id"  SERIAL PRIMARY KEY ,
"first_name" VARCHAR(50) NOT NULL ,
"last_name" VARCHAR(50) NOT NULL ,
"email" VARCHAR(250) UNIQUE NOT NULL ,
"password" VARCHAR(250) NOT NULL ,
"car" VARCHAR(50) NOT NULL ,
"drivers_license" VARCHAR(250) NOT NULL ,
"phone_number" INTEGER NOT NULL ,
"last_transaction" TIMESTAMP ,
);

CREATE TABLE "riders" (
"rider_id"  SERIAL PRIMARY KEY ,
"first_name" VARCHAR(50) NOT NULL ,
"last_name" VARCHAR(50) NOT NULL ,
"email" VARCHAR(250) UNIQUE NOT NULL ,
"password" VARCHAR(250) NOT NULL ,
"payment_id"  SERIAL NOT NULL ,
"phone_number" INTEGER NOT NULL ,
"last_transaction" TIMESTAMP ,
);

CREATE TABLE "payment_info" (
"payment_id"  SERIAL PRIMARY KEY  ,
"card_number" INTEGER ,
"card_zip" INTEGER ,
"card_cvv" INTEGER ,
"card_exp" INTEGER ,
"card_type" TEXT ,
);

ALTER TABLE "riders" ADD FOREIGN KEY ("payment_id") REFERENCES "payment_info" ("payment_id");
