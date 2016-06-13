/* eslint no-var:0 */

// Import
var assert = require('assert-helpers'),
	joe = require('joe')

// Test
joe.suite('map plugin', function (suite, test) {
	var Chainy = require('chainy-core').subclass().require('set').addExtension('map', require('../'))

	test('should work with a synchronous iterator', function (next) {
		Chainy.create()
			.set([1, 2, 3])
			.map(function (i) {
				assert.equal(Boolean(this.getExtension('map')), true,  'iterator has our extension')
				return i * 5
			})
			.done(function (err, result) {
				if (err)  return next(err)
				assert.deepEqual(result, [5, 10, 15])
				return next()
			})
	})

	test('should work with an asynchronous iterator', function (next) {
		Chainy.create()
			.set([1, 2, 3])
			.map(function (i, complete) {
				assert.equal(Boolean(this.getExtension('map')), true, 'iterator has our extension')
				return complete(null, i * 10)
			})
			.done(function (err, result) {
				if (err)  return next(err)
				assert.deepEqual(result, [10, 20, 30])
				return next()
			})
	})
})
