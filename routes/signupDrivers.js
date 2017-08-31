const express = require('express')
const signupDriverRouter = express.Router()

const {
  selectDriversText,
  selectRidersText,
  lastTransactionDriversText,
  lastTransactionRidersText,
  selectDrivers,
  selectRiders,
  selectDriversEmailText,
  selectDriversEmail
} = require('../selectQueries.js');

const {
  insertIntoDriversText,
  insertIntoDrivers,
  insertIntoRidersText,
  insertIntoRiders,
  insertIntoPaymentInfoText,
  insertIntoPaymentInfo
} = require('../insertQueries.js');

signupDriverRouter.get('/signupdriver', (req, res) => {
  let errorObj = {
    error: false,
    message: "",
    activeUserError: false
  }
  if(req.session.email) {
    res.redirect('/')
  }
  if(!req.query.error) {
    res.render('signupdriver', errorObj)
  }
  else if (req.query.error === 'error1') {
    errorObj.error = true
    errorObj.message = 'Please provide email and password to sign up'
    res.render('signupdriver', errorObj)
  }
  else if (req.query.error === 'error2') {
    errorObj.error = true
    errorObj.message = 'Passwords do not match'
    res.render('signupdriver', errorObj)
  }
  else if (req.query.error === 'error3') {
    errorObj.activeUserError = true
    res.render('signupdriver', errorObj)
  }
})

signupDriverRouter.post('/signupdriver', (req, res, next) => {
  if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.car || !req.body.phoneNumber || !req.body.driversLicense ) {
    res.redirect('/signupdriver/?error=error1')
  }
  else if(req.body.password !== req.body.confirmPassword) {
    res.redirect('/signupdriver/?error=error2')
  }
  else{
    return selectDriversEmail(selectDriversEmailText, [req.body.email])
    .then(result => {
      if(result === req.body.email) {
        res.redirect('/signupdriver/?error=error3')
      } else {
        return insertIntoDrivers(insertIntoDriversText, [req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.car, req.body.driversLicense, req.body.phoneNumber])
        .then(result => next())
        .catch(error => res.redirect(console.log(error)))
      }
    })
    .catch(error => res.redirect('/signupdriver/?error=error3'))
  }
})

signupDriverRouter.post('/signupdriver', (req, res) => {
  req.session.email = req.body.email
  res.redirect('/')
})

module.exports = signupDriverRouter
