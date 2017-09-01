const express = require('express');
const signupRiderRouter = express.Router();

const {
  selectRidersEmailText,
  selectRidersEmail,
} = require('../selectQueries.js');

const {
  insertIntoRidersText,
  insertIntoRiders,
} = require('../insertQueries.js');

signupRiderRouter.get('/signuprider', (req, res) => {
  let errorObj = {
    error: false,
    message: '',
    activeUserError: false,
  };
  if (req.session.email) {
    res.redirect('/');
  }

  if (!req.query.error) {
    res.render('signuprider', errorObj);
  } else if (req.query.error === 'error1') {
    errorObj.error = true;
    errorObj.message = 'Please fill out all forms to continue';
    res.render('signuprider', errorObj);
  } else if (req.query.error === 'error2') {
    errorObj.error = true;
    errorObj.message = 'Passwords do not match';
    res.render('signuprider', errorObj);
  } else if (req.query.error === 'error3') {
    errorObj.activeUserError = true;
    res.render('signuprider', errorObj);
  }
});

signupRiderRouter.post('/signuprider', (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.firstName ||
    !req.body.lastName || !req.body.phoneNumber) {
    res.redirect('/signuprider/?error=error1');
  } else if (req.body.password !== req.body.confirmPassword) {
    res.redirect('/signuprider/?error=error2');
  } else {
    return selectRidersEmail(selectRidersEmailText, [req.body.email])
    .then(result => {
      if (result === req.body.email) {
        res.redirect('/signuprider/?error=error3');
      } else {
        return insertIntoRiders(insertIntoRidersText, [req.body.firstName, req.body.lastName,
        req.body.email, req.body.password, req.body.phoneNumber])
        .then(result => next())
        .catch(error => res.redirect(console.log(error)));
      }
    });
  }
});

signupRiderRouter.post('/signuprider', (req, res) => {
  req.session.email = req.body.email;
  res.redirect('/');
});

module.exports = signupRiderRouter;
