// 000001
// 000011
// 000111
// 001111
// 011111
// 111111

// 2,2 = 1
// 000001 000001
// 3,2 = 2
// 000011 000001
// 000001 000011
// 4,2 = 3
// 000011 000011
// 000111 000001
// 000001 000111
// 5,2 = 4
// 000001 001111
// 000011 000111
// 000111 000011
// 001111 000001
// 6,2  = 5
// 000001 011111
// 000011 001111
// 000111 000111
// 001111 000011
// 011111 000001
// 7,2  = 6
// 000001 111111
// 000011 011111
// 000111 001111
// 001111 000111
// 011111 000011
// 111111 000001
// 8,2  = 5
// 000011 111111
// 000111 011111
// 001111 001111
// 011111 000111
// 111111 000011
// 9,2  = 4
// 000111 111111
// 001111 011111
// 011111 001111
// 111111 000111
// 10,2 = 3
// 001111 111111
// 011111 011111
// 111111 001111
// 11,2 = 2
// 011111 111111
// 111111 011111
// 12,2 = 1
// 111111 111111

// 3,3  = 1
// 000001 000001 000001
// 4,3  = 3
// 000011 000001 000001
// 000001 000011 000001
// 000001 000001 000011
// 5,3  = 6
// 000111 000001 000001
// 000001 000111 000001
// 000001 000001 000111
// 000011 000011 000001
// 000011 000001 000011
// 000001 000011 000011

// so for 5-(2) == two more dice, min of 1
// add the probabilities of two dice for each dice
// but two dice has to do similar
// for 5-2 (3) find the combinations to get 3
// include 5-3, combos to get 2
// then 5-4, combos to get 1

// for dice1 = 1-6, find combos with remainder

// heres how it is done with rollig five with 3 dice
// t = total
// ti = total for the first dice
// d = # of dice
// di = # of dice sub set
// r remainder in each loop (total minus ti)
// C = Combinations
// for ti = t - (d - 1) to Ti = 1
// function rolldiceSumProb(t, d){
//   console.debug(t,d)
//   combos = (t, d) => {
//     if (d == 1) return 1;
//     let total = 0;
//     for ( let remaining_d = d - 1, first_d_amt = 6; first_d_amt > 0; first_d_amt--){
//       let remaining_t = t - first_d_amt;
//       console.log(t, first_d_amt, remaining_t, remaining_d);
//       // 1) remaining_t = 11-6 = 5, remaining_d = 1
//       // 2) remaining_t = 11-5 = 6, remaining_d = 1
//       // 2) remaining_t = 11-4 = 7, remaining_d = 1
//       total += ( remaining_t<=(remaining_d * 6)&&remaining_t >= remaining_d)?combos(remaining_t, remaining_d):0;
//       // console.log('total in loop:', total)
//     }
//     console.log('total:', total)
//     return total;
//   }
//   const c = combos(t,d);
//   console.log([c,'/',Math.pow(6,d)].join(''))
//   return c ? c / Math.pow(6,d) : null;
// }
function rolldiceSumProb(t, d){
  b = (t, d, f=0) => {
    if (d == 1) return 1;
    for ( let e = d - 1, c = 6; c > 0; c--){
      let r = t - c;
      f += ( r<=(e * 6)&&r >= e)?b(r, e):0;
    }
    return f;
  }
  const c = b(t,d);
  return c ? c / Math.pow(6,d) : 0;
}
// P padding
// P = (T - i) i-- while i>0
// P must be < di*6 > di
// Combo func
// C(di, pad)
//

// BUT ti must be >= 1 and <=6
// 
  // find C(T2, D2)
console.log(rolldiceSumProb(29, 5));