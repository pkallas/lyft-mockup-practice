# lyft-mockup-practice

The objective of this project is to practice designing and creating a simple database schema,
modeling some of the functionality of Lyft. Afterwards, simple routes were added to test
authentication. Note that there is a table to accept payment info from riders, and a sql query
to insert into the table, but at the present moment, the function and table are not being
used in any of the routes. To start the app, first, go to the pg.js file, and change the user on
line 3 from pkallas to the username on your computer. Then, type npm run db-init to create a database.
Afterwards, just type npm start into the console. If you want to run the tests, first type
npm run testdb-init to create the test database. Afterwards, type npm test.
