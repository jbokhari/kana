d = new Date();
start = d.getTime();
// asume n > 2

class Primes {
  constructor(){
    this.n = 1;
    this.kp = [];
  }
  next(){
    if( this.n >= 5 ) {
      this.n += 2;
    } else {
      this.n += 1;
    }
    for (let l = this.kp.length - 1, i = 0; i < l; i++) {
      if (this.n % this.kp[i] === 0){
        return this.next();
      }
    }
    this.kp.push(this.n);
    return this.n;
  }
  isPrime(n){
    if (this.kp.includes(n))
      return true;
    if ( n % 5 === 0 || n % 2 === 0 )
      return false;
    const sqrt = Math.sqrt(n);
    for (var i=3; i<sqrt; i=i+2 ) {
      if (n % i === 0)
        return false
    }
    return true;
  }
}

// function primeFactors(n){
//   // return "poop";
//   const pGen = new Primes();
//   let prime = pGen.next();
//   let primes = [];
//   // console.log(prime);
//   while( prime <= n ){
//     // if ( isPrime(n) ){
//     //   primes[n] = primes[n] ? primes[n] + 1 : 1;
//     //   break;
//     // }
//     if ( n > 100000 && pGen.isPrime(n)){
//       primes[n] = primes[n] ? primes[n] + 1 : 1;
//       break;
//     }
//     if ( n % prime === 0 ){
//       n = n / prime;
//       primes[prime] = primes[prime] ? primes[prime] + 1 : 1;
//     } else {
//       prime = pGen.next();
//     }
//   }
//   let string = "";
//   for ( const [q,e] of Object.entries(primes) ){
//     if (e > 1){
//       string = `${string}(${q}**${e})`;
//     } else {
//       string = `${string}(${q})`;
//     }
//   }
//   delete Primes;
//   return string;
// }
function primeFactors(n){
    for(var s = '', d = 2;n>1;d++) {
        for (var k = 0;n%d == 0;k++, n/=d);
        s += k ? (k==1 ? `(${d})` : `(${d}**${k})`) : '';
    }
return s
}

const test = 7775460;
console.log(test, ": ", primeFactors(test))
const test2 = 7919;
console.log(test2, ": ", primeFactors(test2))
const test3 = 18195729;
console.log(test3, ": ", primeFactors(test3))
d = new Date();
end = d.getTime();
console.log( end - start );
