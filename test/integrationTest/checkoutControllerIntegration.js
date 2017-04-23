var superagent = require('superagent')
var assert = require('chai').assert

require('../../app')

describe('Integration checkout controller', function () {
  it('should accept a checkout request and return the total', function (done) {
    superagent
      .post('http://localhost:3000/api/checkout')
      .set('Content-Type', 'application/json')
      .send({
        customer: 'ford',
        items: ['classic', 'classic', 'classic', 'classic', 'classic', 'standout', 'premium', 'premium', 'premium']
      })
      .end(function (err, res) {
        if (err) throw done(err)

        assert.deepEqual(res.type, 'application/json')
        assert.deepEqual(res.status, 200)
        assert.isTrue(res.ok)
        assert.deepEqual(res.body.total, 2559.92)

        done()
      })
  })

   it('should accept an empty list request and return zero as total', function (done) {
    superagent
      .post('http://localhost:3000/api/checkout')
      .set('Content-Type', 'application/json')
      .send({
        customer: 'ford'
      })
      .end(function (err, res) {
        if (err) throw done(err)

        assert.deepEqual(res.type, 'application/json')
        assert.deepEqual(res.status, 200)
        assert.isTrue(res.ok)
        assert.deepEqual(res.body.total, 0)

        done()
      })
  })
})
