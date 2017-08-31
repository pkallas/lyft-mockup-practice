const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const loginDriverRouter = require('./routes/loginDrivers.js');
const loginRiderRouter = require('./routes/loginRiders.js');
const signupRiderRouter = require('./routes/signupRiders.js');
const signupDriverRouter = require('./routes/signupDrivers.js');

if (process.env.NODE_ENV === 'test') {
  app.EXPRESS_APP = true;
  app.listen(3000, () => console.log('http://localhost:3000'))
  module.exports = app;
} else {
  app.listen(3000, () => console.log('http://localhost:3000'))
}

app.set('view engine', 'ejs')

app.use(cookieSession({
  name: 'session',
  secret: 'npnldcjdbbnn75239n894'
}))

app.get('/', (req, res) => {
  !req.session.email ? user = 'Stranger' : user = req.session.email
  res.render('homepage', {user})
})

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/')
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(loginDriverRouter)
app.use(loginRiderRouter)
app.use(signupRiderRouter)
app.use(signupDriverRouter)
