const express = require('express')
const signupRiderRouter = express.Router()

const {
  selectDriversText,
  selectRidersText,
  lastTransactionDriversText,
  lastTransactionRidersText,
  selectDrivers,
  selectRiders,
  selectRidersEmailText,
  selectRidersEmail
} = require('../selectQueries.js');


const {
  insertIntoDriversText,
  insertIntoDrivers,
  insertIntoRidersText,
  insertIntoRiders,
  insertIntoPaymentInfoText,
  insertIntoPaymentInfo
} = require('../insertQueries.js');

signupRiderRouter.get('/signuprider', (req, res) => {
  let errorObj = {
    error: false,
    message: "",
    activeUserError: false
  }
  if(req.session.email) {
    res.redirect('/')
  }
  if(!req.query.error) {
    res.render('signuprider', errorObj)
  }
  else if (req.query.error === 'error1') {
    errorObj.error = true
    error.message = 'Please provide email and password to sign up'
    res.render('signuprider', errorObj)
  }
  else if (req.query.error === 'error2') {
    errorObj.error = true
    errorObj.message = 'Passwords do not match'
    res.render('signuprider', errorObj)
  }
  else if (req.query.error === true) {
    errorObj.activeUserError = true
    res.render('signuprider', errorObj)
  }
})

signupRiderRouter.post('/signuprider', (req, res, next) => {
  if(!req.body.email || !req.body.password || !req.body.confirmPasword) {
    res.redirect('/signuprider/?error=error1')
  }
  else if(req.body.password !== req.body.confirmPasword) {
    res.redirect('/signuprider/?error=error2')
  }
  else{
    return selectRidersEmail(selectRidersEmailText, [req.body.email])
    .then(result => {
      if(result === req.body.email) {
        res.redirect('/signuprider/?error=error3')
      } else {
        return insertIntoRiders(insertIntoRidersText, [req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.phoneNumber])
        .then(result => next())
        .catch(error => res.redirect(console.log(error)))
      }
    })
  }
})

signupRiderRouter.post('/signuprider', (req, res) => {
  req.session.email = req.body.email
  res.redirect('/')
})

module.exports = signupRiderRouter
