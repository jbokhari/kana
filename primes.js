d = new Date();
start = d.getTime();
knownPrimes = []

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
console.log(primeFactors(7775460));
d = new Date();
total = ~~( ( d.getTime() - start ));
