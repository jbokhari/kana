// https://www.codewars.com/kata/shrink-the-maze/train/javascript
"use strict";
//non-hex
//          0   1   2   3   4   5   6   7   8   9
const L = ["g","h","i","j","k","l","m","n","o","p"];

// Return a stringified representation of the passed map.
function stringifyMap(map) {
  let t="",l = map[0].length.toString().split(''),c,r,q,s;

  // r, row length, is represented by non hex letters (see L)
  r = l.map(q=>{;return L[q]}).join('');
  // convert map to flat hexidecimal
  map.map(a=>{a.map(b=>{t+=b?"1":"0"})});

  // fix for max int 2**52?
  do{
    s = s?","+s:"";
    q=t.slice(-52);
    t=t.slice(0,Math.max(t.length-52,0))
    s=parseInt(q,2).toString(16)+s
  } while(t.length>0)
  return s + r
}
// var test = Array(8).fill(Array(6).fill(true));
// test[0][0]=false
// console.log(alltrue);

// Convert your stringified representation back into a map.
function parseMap(mapString) {
    let l = '', i = mapString.length - 1,f =[],b=[],e;
    const o = mapString.split('');

    // reduces o to hex and removes/converts length characters
    while ( i ){
        l = L.indexOf(o.pop()) + l;
        i--;
        if ( !L.includes(o[i]) )
            i = 0;
    }
    console.log(l)
    // reconstruct binary as array
    var q = o.join('').split(',');
    q.forEach(a=>{
        b.push(parseInt(a,16).toString(2));
    });
    b = b.map(v=>{
        // v = v.split('')
        while (v.length < l){
            v.unshift(0)
        }
        return v;
    }).join('').split('');

    // pad bin for initial false values (b.length should = e)
    e = Math.ceil(b.length/l)*l;
    while (b.length < e){
        b.unshift(0)
    }
    // console.log("b,e", b,e);
    // console.log("b,e", b,l);
    // b = b.join('');
    // put it all together
    for (let r = 0; r < (b.length/l); r++) {
        f[r] = [];
        for (let c = 0; c<l; c++) {
            f[r][c] = b[r*l+c]==1
        }
    }
    return f;
}

const map = [[true,false,false,false,true,false,true,true,false,false],[false,true,true,false,false,true,false,false,false,false],[false,false,true,false,true,true,false,false,true,false],[false,false,true,true,true,false,true,false,false,false],[true,true,false,true,true,false,true,false,true,true],[true,false,true,true,false,false,false,false,true,false],[true,false,true,true,true,false,true,false,false,false]];
console.log(parseMap(stringifyMap(map)))

// var compressed = stringifyMap(map);
// console.log(compressed)

// var decompressed = parseMap(compressed);
// console.log(compressed, decompressed, map);
// var bin = parseInt(hex,16).toString(2)
// console.log(bin);

