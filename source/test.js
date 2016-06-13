"use strict";
// Import
var expect = require('chai').expect,
	joe = require('joe')

// Test
joe.describe('map plugin', function(describe,it){
	var Chainy = require('chainy-core').subclass().require('set').addExtension('map', require('../'))

	it("should work with a synchronous iterator", function(next){
		var chain = Chainy.create()
			.set([1,2,3])
			.map(function(i){
				expect(!!this.getExtension('map'), 'iterator has our extension').to.equal(true)
				return i*5
			})
			.done(function(err, result){
				if (err)  return next(err)
				expect(result).to.deep.equal([5, 10, 15])
				return next()
			})
	})

	it("should work with an asynchronous iterator", function(next){
		var chain = Chainy.create()
			.set([1,2,3])
			.map(function(i, complete){
				expect(!!this.getExtension('map'), 'iterator has our extension').to.equal(true)
				return complete(null, i*10)
			})
			.done(function(err, result){
				if (err)  return next(err)
				expect(result).to.deep.equal([10, 20, 30])
				return next()
			})
	})
})
