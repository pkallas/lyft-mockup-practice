DROP DATABASE IF EXISTS Drive_By_Test;
CREATE DATABASE Drive_By_Test;

\c Drive_By_Test

CREATE TABLE "drivers" (
"driver_id"  SERIAL NOT NULL ,
"first_name" VARCHAR(50) NOT NULL ,
"last_name" VARCHAR(50) NOT NULL ,
"email" VARCHAR(250) NOT NULL ,
"password" VARCHAR(250) NOT NULL ,
"car" VARCHAR(50) NOT NULL ,
"drivers_license" VARCHAR(250) NOT NULL ,
"phone_number" INTEGER NOT NULL ,
"last_transaction" TIMESTAMP ,
PRIMARY KEY ("driver_id")
);

CREATE TABLE "riders" (
"rider_id"  SERIAL NOT NULL ,
"first_name" VARCHAR(50) NOT NULL ,
"last_name" VARCHAR(50) NOT NULL ,
"email" VARCHAR(250) NOT NULL ,
"password" VARCHAR(250) NOT NULL ,
"payment_id"  SERIAL NOT NULL ,
"phone_number" INTEGER NOT NULL ,
"last_transaction" TIMESTAMP ,
PRIMARY KEY ("rider_id")
);

CREATE TABLE "payment_info" (
"payment_id"  SERIAL NOT NULL ,
"card_number" INTEGER ,
"card_zip" INTEGER ,
"card_cvv" INTEGER ,
"card_exp" INTEGER ,
"card_type" TEXT ,
PRIMARY KEY ("payment_id")
);

ALTER TABLE "riders" ADD FOREIGN KEY ("payment_id") REFERENCES "payment_info" ("payment_id");
