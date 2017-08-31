scripts in package.json run as expected 🤘

two tests fail due to timeout of 2000ms exceeded
still fails is change timeout to 5000ms

I would name selectQueries.js+insertQueries.js => queries.js or make a queries folder with two files named select.js and insert.js

I would handle creating and dropping db in separate scripts in
package.json. Exposing so much in one command could lead to accidentally
deleting needed data when you just mean to add a new table etc...
I would have a createdb script, createSchema script, and

Schema looks good 🖖

insertQueries.js has raw SQL next to function that uses it. selectQueries.js has all raw SQL at top of file and all functions below. Either are fine but be consistent.


Why only test select queries?

Some editing is just my preference for formatting fyi

I had to edit the pg.js file to have my user name for the db which you could dynamically set but once I did I was able to execute signing up via both roles and logout then log back in via both roles so everything works! 🍕

don't forget to add .gitignore and add node_modules

Great work, this looks awesome, was easy to follow and quite readable! Y'all rule!
