// https://www.codewars.com/kata/shrink-the-maze/train/javascript
//non-hex
//          0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
const L = ["g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v"];

// a lot of zeros
const P = "0000";

// Return a stringified representation of the passed map.
function stringifyMap(map) {
  let t="",l = map[0].length.toString(16).split(''),c,r,q,s;

  // r, row length, is represented by non hex letters (see L)
  r = l.map(q=>{;return L[parseInt(q,16)]}).join('');
  // convert map to flat hexidecimal
  map.map(a=>{a.map(b=>{t+=b?"1":"0"})});

  // converts chunks of binary to hex
  do{
    s = s?s:"";
    q=t.slice(-4);
    t=t.slice(0,Math.max(t.length-4,0))
    s=parseInt(q,2).toString(16).slice(-1)+s
  } while(t.length>0)
  return s + r
}

// Convert your stringified representation back into a map.
function parseMap(mapString) {
    let l = '', i = mapString.length - 1,f =[],b=[],c,e;
    const o = mapString.split('');

    // reduces o to hex and removes/converts length characters
    while ( i ){
        l = L.indexOf(o.pop()).toString(16) + l;
        i--;
        if ( !L.includes(o[i]) )
            i = 0;
    }
    l = parseInt(l,16);

    // reconstruct binary as array
    var q = o.join('')
    do {
        c=q.slice(-1);
        // note chunks must be 4 chars long, unless its the first chunk
        b=((q.length==1?'':P)+parseInt(c,16).toString(2)).slice(-4)+b;
        q=q.slice(0,q.length-1);
    } while(q.length > 0);

    // pad string for initial false values
    e = Math.ceil(b.length/l)*l;
    b = (P + b).slice(-e);

    // put it all together
    for (let r = 0; r < (b.length/l); r++) {
        f[r] = [];
        for (let c = 0; c<l; c++) {
            f[r][c] = b[r*l+c]==1
        }
    }
    return f;
}

const map = [[false,false,false,false,false,false,true,true,true,true,true,false,true],[false,false,false,true,false,false,true,false,false,true,true,false,false],[true,false,true,true,false,false,true,false,true,false,false,true,false],[true,true,false,false,false,false,false,false,true,true,false,true,false],[false,false,false,true,true,false,false,true,false,false,true,false,true],[false,false,true,true,true,true,false,true,true,false,true,false,false]];
var encoded = stringifyMap(map);
var decoded = parseMap(encoded);
console.log(encoded, map.length * map[0].length, encoded.length);
console.log(decoded.toString());
console.log(decoded.toString() === map.toString());

// var compressed = stringifyMap(map);
// console.log(compressed)

// var decompressed = parseMap(compressed);
// console.log(compressed, decompressed, map);
// var bin = parseInt(hex,16).toString(2)
// console.log(bin);

