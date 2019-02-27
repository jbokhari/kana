var assert = require('chai').assert;
var expect = require('chai').expect;
var nextBigger = require('../nextbiggest.js');

describe("basic tests", function(){
    it("should work", function(){

        expect(nextBigger(12)).to.equal(21);
        expect(nextBigger(513)).to.equal(531);
        expect(nextBigger(2017)).to.equal(2071);
        expect(nextBigger(414)).to.equal(441);
        expect(nextBigger(144)).to.equal(414);
        expect(nextBigger(123456789)).to.equal(123456798);
        expect(nextBigger(59884848459853)).to.equal(59884848483559);
        expect(nextBigger(59884848457653)).to.equal(59884848463557);

    });
});