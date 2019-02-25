var points = [
			[2,2], // A
			[2,8], // B
			[5,5], // C
			[6,3], // D
			[6,7], // E
			[7,4], // F
			[7,9]  // G
		];

const byX = (a,b)=>{ return a[0] - b[0]; }
const byY = (a,b)=>{ return a[1] - b[1]; }
const dist = (ß,Ω)=>{
	return Math.sqrt((ß[0]-Ω[0])**2 + (ß[1]-Ω[1])**2);
}
const minD = (a,b) =>{
	return a.d < b.d ? a : b;
}
const bruteForce = (points)=>{
	let minimum = {p:[],d:Infinity}
	points.forEach(a=>{
		let last = [];
		last.forEach(p =>{
			let d = dist(a, p);
			minimum = d < minimum.d ? {d,p:[a,p]} : minimum;
		});
		last.push(a);
	});
	return minimum;
}
const stripClosest = (points, minP)=>{
	minimum = minP;
	points.sort(byY);
	points.forEach(a=>{
		let last = [];
		last.forEach(p =>{
			if ( Math.absolute(a[1] - p[1]) > minimum ){
				return;
			}
			let d = dist(a, p);
			minimum = d < minimum.d ? {d,p:[a,p]} : minimum;
		});
		last.push(a);
	});
}
function closestPair(s) {

		if ( s.length < 3 ){
			return bruteForce(s);
		}

		let lchunk = s;
		let min = parseInt(lchunk.length / 2);
		let minPoint = s[min];
		let rchunk = lchunk.splice(0, Math.ceil(minPoint));
		
		let lmin = closestPair(lchunk);
		let rmin = closestPair(rchunk);

		// minpoint minP.p minP.d
		let minP = minD(lmin,rmin);
		let strip = s.slice();
		strip.filter(a=>{
			return Math.abs(a[0] - minPoint[0]) < d
		});
		
		return Math.min(stripClosest(strip, minP), d)
}
closestPair(points);
