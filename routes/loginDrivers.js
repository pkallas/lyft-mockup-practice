const express = require('express');
const loginDriverRouter = express.Router();
const {
  selectDriversText,
  selectDrivers
} = require('../selectQueries.js');

loginDriverRouter.get('/driverlogin', (req, res) => {
  let errorObj = {
    error: false,
    message: ""
  }
  if(req.session.email) {
    res.redirect('/')
  }
  if(!req.query.error) {
    res.render('driverlogin', errorObj)
  }
  else if(req.query.error === 'error1') {
    errorObj.error = true
    errorObj.message = 'Please identify yourself'
    res.render('driverlogin', errorObj)
  }
  else if(req.query.error === 'error2') {
    errorObj.error = true
    errorObj.message = 'Email or password was incorrect. Do it over.'
    res.render('driverlogin', errorObj)
  }
})

loginDriverRouter.post('/driverlogin', (req, res, next) => {
  if(!req.body.email || !req.body.password) {
    res.redirect('driverlogin/?error=error1')
  } else {
    return selectDrivers(selectDriversText, [req.body.email], req.body.password)
    .then(result => {
      if(result === true) {
        next()
      } else {
        res.redirect('/driverlogin/?error=error2')
      }
    })
  .catch(error => res.redirect(console.error(error)))
  }
})

loginDriverRouter.post('/driverlogin', (req, res) => {
  req.session.email = req.body.email
  res.redirect('/')
})

module.exports = loginDriverRouter;
