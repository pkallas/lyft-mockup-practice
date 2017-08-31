process.env.NODE_ENV ='test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app.js');

chai.use(chaiHttp)
const request = chai.request;

describe('app', function() {
  it('should be an express app', function() {
    expect(app.EXPRESS_APP).to.be.true
  })
  it('should render text at homepage', function(done) {
    request(app)
    .get('/')
    .end((error, response) => {
      expect(error).to.be.null
      expect(response).to.have.status(200)
      done()
    })
  })
  it('should redirect if the password and confirmPassword do not match', function() {
    return request(app)
    .post('/signuprider')
    .set('content-type', 'application/x-www-form-urlencoded' )
    .send({email:'john@gmail.com',
          password:'apple',
          confirmPassword:'oranges',
          phoneNumber:'415345333',
          firstName:'sabrin',
          lastName:'nas'
  })
  .then(function(result) {
    expect(result.redirects[0]).to.match(/\/signuprider\/\?error=error2$/)})
  })
})
