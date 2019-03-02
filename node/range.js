function solution(list, r=[]){
    let l = [list.shift()]
    const v = (q) => {
        return q.length>2?[`${q[0]}-${q[k-1]}`]:q;
    }
    list.sort((a, b) => a - b).map(c=>{
        let k = l.length;
        if (k>0 && l[k-1]==c-1){
            l.push(c);
        } else {
            r.push( ...v(l) );
            l = [c];
        }
    });
    r.push( ...v(l) );
    return r.toString();
}

// loop through items
// if last item is one less than previous,
// track item in array
// if it is not, append the last elements of the array
// to r
// and replace l with [a]

module.exports=solution;