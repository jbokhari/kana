var assert = require('chai').assert;
var expect = require('chai').expect;
var ClosestPair = require('../closestpair.js');
c = new ClosestPair();
describe('closest', function() {
	describe('utility functions',  function() {
		var testpoints = [[1,4], [4,5], [3,2], [2,6]];
		it('can order by x',  function() {
			var orderedbyx = testpoints.sort(c.byX);
			expect(orderedbyx).to.eql([[1,4],[2,6],[3,2],[4,5]]);
		});
		it('can order by y',  function() {
			var orderedbyy = testpoints.sort(c.byY);
			// console.log(orderedbyy)
			expect(orderedbyy).to.eql([[3,2],[1,4],[4,5],[2,6]]);
		});
		it('can find distance between two points',  function() {
			var distA = c.dist([3,2],[1,4]);
			// console.log(orderedbyy)
			expect(distA).to.equal(Math.sqrt(8));
			var distB = c.dist([1,1],[4,5]);
			// console.log(orderedbyy)
			expect(distB).to.equal(5);
		});
	});
	describe('bruteForce', function() {
		it('can find closest point between 3 points', function(){
			var result = c.bruteForce([[3,2],[1,4],[2,6]]);
			var clp = [[1,4],[2,6]];
			expect(result).to.have.property('p').with.lengthOf(2);
			expect(result.d).to.equal(Math.sqrt(5));
			result.p.forEach(a =>{
				expect(clp).to.deep.include(a);
			});
		});
		it('can find closest point between 2 points', function(){
			var result = c.bruteForce([[3,2],[4,5]]);
			var clp = [[4,5],[3,2]];
			expect(result).to.have.property('p').with.lengthOf(2);
			expect(result.d).to.equal(Math.sqrt(10));
			result.p.forEach( a =>{
				expect(clp).to.deep.include(a);
			});
		});
		it('can find minimum between two objects', function(){
			var resultA = c.bruteForce([[3,2],[4,5]]);
			var resultB = c.bruteForce([[1,4],[2,6]]);
			expect(c.minD(resultA,resultB)).to.have.property("d").that.equals(Math.sqrt(5))
			expect(c.minD(resultA,resultB)).to.have.property("p").that.deep.contains([1,4]);
			expect(c.minD(resultA,resultB)).to.have.property("p").that.deep.contains([2,6]);
		});
	});
	describe('minimum object', function() {

		it(`can work determine minimum d`, function(){
			expect(c.minD({d:1, p:[]},{d:2, p:[]})).to.eql({d:1, p:[]});
			expect(c.minD({d:2, p:[]},{d:1, p:[]})).to.eql({d:1, p:[]});
			var min = Math.random();
			var max = min + .000001;
			expect(c.minD({d:min, p:[]},{d:max, p:[]})).to.eql({d:min, p:[]});
			expect(c.minD({d:max, p:[]},{d:min, p:[]})).to.eql({d:min, p:[]});
		});
	});
	describe('random tests algorithmic vs brute force', function() {
		const randomGrid = () => Math.ceil( Math.random() * 1000 ) + Math.random();

		for (let randos = 1; randos <= 12; randos++) {
			var count = 2 ** randos;
			var countm = count + 101;

			it(`can work with ${count}-${countm} random points`, function(){
				this.timeout(10000);
				count = 2 ** randos + Math.floor( Math.random() * 101 );
				let points = [];

				for (let i = 0; i < count; i++) {
					points.push(randomGrid(), randomGrid());
				}
				let algorithmic = c.closest(points);
				let bruteForce = c.bruteForce(points);
				bruteForce.p.forEach(a => {
					expect(algorithmic.p).to.deep.include(a);
				});
				expect(bruteForce.d).to.equal(algorithmic.d);
			});

		}
	});
	describe('specific tests', function() {
		it('can solve case a', function(){
			var points = [
				[2,2],
				[2,8],
				[5,5],
				[6,3],
				[6,7],
				[7,4],
				[7,9]
			];
			var clp = [[6,3],[7,4]];
			var result = c.closest(points);
			expect(result).to.have.property('p').with.lengthOf(2);
			expect(result.d).to.equal(Math.sqrt(2));
			result.p.forEach(a => {
				expect(clp).to.deep.include(a);
			});
			expect(result.d).to.equal(c.bruteForce(points).d);
		});
		it('can solve case b', function(){
			var points = [
				[2,2],
				[11,4],
				[2,8],
				[12,8],
				[5,5],
				[6,7],
				[6,3],
				[12,9],
				[7,4],
				[13,7],
				[7,11],
				[8,8],
			];
			var clp = [[12,8],[12,9]];
			var result = c.closest(points);
			expect(result).to.have.property('p').with.lengthOf(2);
			expect(result.d).to.equal(1);
			result.p.forEach(a => {
				expect(clp).to.deep.include(a);
			});
			expect(result.d).to.equal(c.bruteForce(points).d);
		});
		it(`can solve case c`, function(){
			let points = [
				[ 16, 21 ],
				[ 23, 14 ],
				[ 10, 20 ],
				[ 10, 12 ],
				[ 13,  9 ],
				[ 24, 11 ],
				[ 16, 24 ],
				[ 21, 10 ],
				[ 18, 20 ],
				[  8, 22 ],
				[ 12, 19 ],
				[ 19, 14 ],
				[ 19, 24 ],
				[ 22, 20 ],
				[ 13, 12 ],
				[ 24, 17 ],
				[  9, 15 ],
				[ 10,  8 ],
				[ 22, 24 ],
				[ 16,  9 ],
				[ 16, 24 ],
				[ 12, 24 ],
				[ 16, 16 ],
				[ 14, 16 ],
				[ 16, 14 ],
				[ 19, 17 ]
			];
			let algorithmic = c.closest(points);
			let bruteForce = c.bruteForce(points);
			// console.log(bruteForce, algorithmic);
			expect(bruteForce.d).to.equal(algorithmic.d);
			let actual = [[16, 24], [16, 24]];
			actual.forEach(a => {
				expect(algorithmic.p).to.deep.include(a);
			});
		});
		it('can solve case d', function(){
			var points = [
				[4,4],
				[1,2],
				[2,5],
				[7,2],
				[6,5],
				[4,4],
			];
			var clp = [[4,4],[4,4]];
			var result = c.closest(points);
			expect(result).to.have.property('p').with.lengthOf(2);
			expect(result.d).to.equal(0);
			expect(clp).to.eql(result.p);
			expect(result.d).to.equal(c.bruteForce(points).d);
		});
		it('can solve case e', function(){
			var points = [
				[4,4],
				[1,2],
				[2,5],
				[7,2],
				[6,5],
				[4,5],
			];
			var clp = [[4,4],[4,5]];
			var result = c.closest(points);
			expect(result).to.have.property('p').with.lengthOf(2);
			expect(result.d).to.equal(1);
			clp.forEach(a => {
				expect(result.p).to.deep.include(a);
			});
			expect(result.d).to.equal(c.bruteForce(points).d);
		});
	});
});

