// https://www.codewars.com/kata/shrink-the-maze/train/javascript
//non-hex
//          0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
const L = ["g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v"];

// a lot of zeros
const P = (2**53).toString(2).slice(-52);

// Return a stringified representation of the passed map.
function stringifyMap(map) {
  let t="",l = map[0].length.toString(16).split(''),c,r,q,s,h;

  // r, row length, is represented by non hex letters (see L)
  r = l.map(q=>{;return L[parseInt(q,16)]}).join('');
  // convert map to flat hexidecimal
  map.map(a=>{a.map(b=>{t+=b?"1":"0"})});

  // fix for MAX_SAFE_INTEGER
  do{
    s = s?s:"";
    q=t.slice(-52);
    t=t.slice(0,Math.max(t.length-52,0))
    s=((h?'':P) + parseInt(q,2).toString(16)).slice(-14)+s
    h=1;
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
        c = q.slice(-14);
        b = parseInt(c,16).toString(2) + b;
        q = q.slice(0,Math.max(q.length-14,0));
    } while(q.length > 0);
    b = b.split('');
    console.log(b.toString());
    // q.forEach(a=>{
    //     b.push(parseInt(a,16).toString(2));
    // });

    // b[0] may be < 52
    // but b[n] n>0 is definitely 52, so add padding
    for (let y = b.length, i = 1; i < y; i++) {
        b[i] = (P + b[i]).slice(-52);
    }

    b = b.join('');

    // pad entire string for initial false values
    // here we assume the first row is not all false
    // if it is, compression will break
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

const map = [[false,false,true,false,false,false,true,false,false,false,true,true,false,false,false],[false,false,true,true,true,true,false,false,true,false,false,true,false,false,true],[false,true,false,false,false,true,true,false,false,true,false,false,true,true,false],[false,false,false,true,false,true,true,false,false,false,false,false,true,false,false],[true,false,true,false,true,false,false,false,true,true,false,true,false,false,false],[true,true,true,false,false,false,false,false,true,true,false,true,false,false,false],[false,false,false,false,false,true,true,false,false,true,false,true,false,true,true],[false,false,true,true,false,true,false,true,false,true,false,true,false,true,true],[true,true,false,false,false,true,false,false,false,true,false,false,true,false,true],[true,false,false,true,false,false,false,true,false,false,true,false,true,false,false],[true,false,true,true,false,true,true,false,false,false,false,true,false,true,false],[true,false,false,false,false,true,true,false,true,true,false,true,true,true,true]];
var encoded = stringifyMap(map);
var decoded = parseMap(encoded);
console.log(encoded, map.length * map[0].length, encoded.length);
console.log(decoded.toString() === map.toString());

// var compressed = stringifyMap(map);
// console.log(compressed)

// var decompressed = parseMap(compressed);
// console.log(compressed, decompressed, map);
// var bin = parseInt(hex,16).toString(2)
// console.log(bin);

