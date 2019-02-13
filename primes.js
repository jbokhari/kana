d = new Date();
start = d.getTime();
knownPrimes = []
const randInt = (n) => {
  n = ~~(n / 2);
  return Math.floor(Math.random() * ~~(n) - 1);
}
const fermat = (a, p) => {
  return Math.pow(a, p - 1) % p === 1;
}
isPrime = n => {
  let k = 4;
  if (n <= 1 || n == 4) return false;
  if (n <= 3) return true;
  while( k > 0){
    const a = randInt(n);
    if ( !fermat(a, n) )
      return true;
    k--;
  }
  return false;
}
nextPrime = () => {
  this.n = this.n ? this.n + 1 : 2;
  while( this.n > 2 && (this.n % 5 === 0 || this.n % 2 === 0 )) {
    this.n += 1;
  }
  knownPrimes = knownPrimes ? knownPrimes : [];
  for (let l = knownPrimes.length - 1, i = 0; i < l; i++) {
    if (this.n % knownPrimes[i] === 0){
      return nextPrime();
    }
  }
  knownPrimes.push(this.n);
  return this.n;
}

function primeFactors(n){
  let prime = nextPrime();
  let primes = [];
  while( prime <= n ){
    // if ( isPrime(n) ){
    //   primes[n] = primes[n] ? primes[n] + 1 : 1;
    //   break;
    // }
    if ( n % prime === 0 ){
      n = n / prime;
      primes[prime] = primes[prime] ? primes[prime] + 1 : 1;
    } else {
      prime = nextPrime();
    }
  }
  let string = "";
  for ( const [q,e] of Object.entries(primes) ){
    if (e > 1){
      string = `${string}(${q}**${e})`;
    } else {
      string = `${string}(${q})`;
    }
  }
  return string;
}
let v;
// while( (v = nextPrime()) < 1000){
//   // is = isPrime(v)
// }
console.log(isPrime(7775460));

d = new Date();
total = ~~( ( d.getTime() - start ));
console.log(`${total}ms`);
// let candidates = primes(n);
// const dvsbl = {};
// function primeFactors(n){
//   const primes = number => {
//     const top = ~~((number-1)/2);
//     let pl = [];
//     let nRange = Array(top).fill(2).map( (i,j) => i+j );
//     while(nRange.length){
//       const cur = nRange.shift();
//       pl.push(cur);
//       nRange = nRange.filter( v => {
//         return v%cur !== 0;
//       });
//     }
//     return pl;
//   }
//   let candidates = primes(n);
//   const dvsbl = {};
//   console.log( candidates );
//   return
//   while ( candidates.length > 0 ){
//     if (candidates.includes(n)){
//       dvsbl[n] = dvsbl[n] ? dvsbl[n] + 1 : 1;
//       break;
//     }
//     const cand = candidates[0]
//     const q = (n / cand)
//     if ( q === Math.floor(q) ){
//       dvsbl[cand] = dvsbl[cand] ? dvsbl[cand] + 1 : 1;
//       n = q;
//     } else {
//       candidates.unshift()
//     }
//   }
//   let string = "";
//   for ( const [q,e] of Object.entries(dvsbl) ){
//     if (e > 1){
//       string = `${string}(${q}**${e})`;
//     } else {
//       string = `${string}(${q})`;
//     }
//   }
//   return string;
// }