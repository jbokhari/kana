class ClosestPair{
	constructor(){
		this.calculations = 0;
	}
	byX(ß,Ω){ return ß[0] - Ω[0]; }
	byY(ß,Ω){ return ß[1] - Ω[1]; }
	dist(ß,Ω){
		this.calculations++;
		return Math.sqrt((ß[0]-Ω[0])**2 + (ß[1]-Ω[1])**2);
	}
	minD(a,b){
		return a.d < b.d ? a : b;
	}
	bruteForce(points){
		let minimum = {p:[],d:Infinity}
		let last = [];
		points.forEach( a=> {
			last.forEach( p => {
				let d = this.dist(a, p);
				minimum = ( d < minimum.d ) ? {d, p:[p,	a]} : minimum;
			});
			last.push(a);
		});
		return minimum;
	}
	stripClosest(points, minP){
		points.sort(this.byY);
		var minimum = minP;
		var distance = minP.d;
		var last = [];
		points.forEach(a => {
			// for (var i = 0; i < last.length && Math.abs(a[1] - last[i][1]) <= distance; i++) {
			last.forEach( p => {
				let d = this.dist(a, p);
				if (a[1] - p[1] > distance){
					return;
				}
				minimum = ( d < minimum.d ) ? {d, p:[p,	a]} : minimum;
			});
			last.push(a);
		});
		return minimum;
	}
	closestUtil(s){

		if ( s.length <= 3 ){
			return this.bruteForce(s);
		}

		let lchunk = s.slice();
		let midindex = parseInt(lchunk.length / 2);
		let midpoint = s[midindex][0];
		let rchunk = lchunk.splice(0, midindex);
		
		let lmin = this.closestUtil(lchunk);
		let rmin = this.closestUtil(rchunk);

		let lrmin = this.minD(lmin, rmin);

		let strip = [];
		s.forEach( (a)=>{
			if ( Math.abs(a[0] - midpoint) <= lrmin.d ){
				strip.push(a);
			}
		});
		var stripmin = this.stripClosest(strip, lrmin);

		return this.minD(stripmin, lrmin);
	}
	reset(){
		this.calculations = 0;
	}
	closest(s){
		this.reset();
		// var points = s.slice();
		s.sort(this.byX);

		var closest = this.closestUtil(s);
		// console.log("calculations:", this.calculations);
		return closest;
	}
}
// var closestPoints = closestPair(points);
module.exports = ClosestPair;