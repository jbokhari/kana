function nextBigger(n,r=-1,d,p,l,o={v:Infinity}){
    n = (''+n).split('');
    l = n.length-1;
    for (let i=l; i>=0; i--) {
        d = n[i];
        if (d<p){
            let f = n.splice(i+1);
            for (let j = f.length - 1; j >= 0; j--) {
                o = d<f[j] && f[j]<o.v ? {v:f[j],i:j}:o;
            }
            [n[i],f[o.i] ] = [f[o.i],n[i]];
            n = n.concat(f.sort());
            r = parseInt((n).join(''));
            break;
        }
        p = d;
    }
    return r;
}

// loop through in reverse
// find first number to be smaller than its former, swap the two,
// reorganize the remaning numbers in order.
// cut from original,
// place behind last known smallest number
module.exports = nextBigger;