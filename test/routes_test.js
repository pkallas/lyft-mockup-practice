process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app.js');

chai.use(chaiHttp);
const request = chai.request;

describe('app', function () {
  it('should be an express app', function () {
    expect(app.EXPRESS_APP).to.be.true;
  });

  it('should render text at homepage', function (done) {
    request(app)
    .get('/')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(200);
      done();
    });
  });

  it('should render text at rider login page', function (done) {
    request(app)
    .get('/riderlogin')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(200);
      done();
    });
  });

  it('should render text at driver login page', function (done) {
    request(app)
    .get('/driverlogin')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(200);
      done();
    });
  });

  it('should render text at rider sign up page', function (done) {
    request(app)
    .get('/signuprider')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(200);
      done();
    });
  });

  it('should render text at driver sign up page', function (done) {
    request(app)
    .get('/signupdriver')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(200);
      done();
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/signuprider')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: 'john@gmail.com',
          password: 'apple',
          confirmPassword: 'oranges',
          phoneNumber: '415345333',
          firstName: 'sabrin',
          lastName: '',
        })
  .then(function (result) {
      expect(result.redirects[0]).to.match(/\/signuprider\/\?error=error1$/);
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/signuprider')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: 'john@gmail.com',
          password: 'apple',
          confirmPassword: 'oranges',
          phoneNumber: '',
          firstName: 'sabrin',
          lastName: 'nas',
        })
  .then(function (result) {
      expect(result.redirects[0]).to.match(/\/signuprider\/\?error=error1$/);
    });
  });

  it('should redirect if the password and confirmPassword do not match', function () {
    return request(app)
    .post('/signuprider')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: 'john@gmail.com',
          password: 'apple',
          confirmPassword: 'oranges',
          phoneNumber: '415345333',
          firstName: 'sabrin',
          lastName: 'nas',
        })
  .then(function (result) {
      expect(result.redirects[0]).to.match(/\/signuprider\/\?error=error2$/);
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/signupdriver')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: 'john@gmail.com',
          password: 'apple',
          confirmPassword: 'blueberries',
          phoneNumber: '415345333',
          firstName: 'Patrick',
          lastName: 'Kallas',
          car: 'Saturn',
          driversLicense: '',
        })
  .then(function (result) {
      expect(result.redirects[0]).to.match(/\/signupdriver\/\?error=error1$/);
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/signupdriver')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: 'john@gmail.com',
          password: 'apple',
          confirmPassword: '',
          phoneNumber: '415345333',
          firstName: 'Patrick',
          lastName: 'Kallas',
          car: 'Saturn',
          driversLicense: '498137471',
        })
  .then(function (result) {
      expect(result.redirects[0]).to.match(/\/signupdriver\/\?error=error1$/);
    });
  });

  it('should redirect if the password and confirmPassword do not match', function () {
    return request(app)
    .post('/signupdriver')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: 'john@gmail.com',
          password: 'apple',
          confirmPassword: 'blueberries',
          phoneNumber: '415345333',
          firstName: 'Patrick',
          lastName: 'Kallas',
          car: 'Saturn',
          driversLicense: '837132791347',
        })
  .then(function (result) {
      expect(result.redirects[0]).to.match(/\/signupdriver\/\?error=error2$/);
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/driverlogin')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: '',
          password: '',
        })
    .then(function (result) {
      expect(result.redirects[0]).to.match(/\/driverlogin\/\?error=error1$/);
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/driverlogin')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: 'pkallas@gmail.com',
          password: '',
        })
    .then(function (result) {
      expect(result.redirects[0]).to.match(/\/driverlogin\/\?error=error1$/);
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/driverlogin')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: '',
          password: '123',
        })
    .then(function (result) {
      expect(result.redirects[0]).to.match(/\/driverlogin\/\?error=error1$/);
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/riderlogin')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: '',
          password: '123',
        })
    .then(function (result) {
      expect(result.redirects[0]).to.match(/\/riderlogin\/\?error=error1$/);
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/riderlogin')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: '',
          password: '123',
        })
    .then(function (result) {
      expect(result.redirects[0]).to.match(/\/riderlogin\/\?error=error1$/);
    });
  });

  it('should redirect if not all forms are filled out', function () {
    return request(app)
    .post('/riderlogin')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: '',
          password: '123',
        })
    .then(function (result) {
      expect(result.redirects[0]).to.match(/\/riderlogin\/\?error=error1$/);
    });
  });
});
