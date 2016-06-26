var assert = require('chai').assert;
var request = require('supertest');

var app = require('../app').get_instance('../motly-test')

describe('POST /track', function() {
  it('respond with text', function(done) {
    request(app)
      .post('/track')
      .set('Accept', 'application/json')
      .expect(200, done);
  })
})
