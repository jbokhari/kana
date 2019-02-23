class Heap {
  constructor(index = 0, values=[]){
    this.values = values;
    this.index = index;
  }
  size(){
    return this.values.length;
  }
  set(i,v){
    this.values[i] = v;
  }
  get(i){
    return this.values[i];
  }
  getVal(i){
    return this.values[i][this.index];
  }
  parent(i){
    return Math.ceil(i/2) - 1;
  }
  left(i){
    return (2*i+1);
  }
  right(i){
    return (2*i+2);
  }
  isSingle(i){
    return this.left(i) >= this.size();
  }
  isLeaf(i){
    let li = this.left(i)
    return li == this.size() - 1
  }
  swap(s,w){
    const a = this.get(s);
    const p = this.get(w);
    this.set(s,p);
    this.set(w,a);
  }
  up(i){
    let pi = this.parent(i);
    if (pi < 0) return;
    let pv = this.getVal(pi);
    let iv = this.getVal(i);
    if ( pv > iv ){
      this.swap(i,pi);
      this.up(pi);
    }
  }
  down(i){
    if ( this.isSingle(i) ){
      return;
    }

    let iv   = this.getVal(i);

    let li = this.left(i);
    let lv = this.getVal(li);
    if ( this.isLeaf(i) ){
      if ( lv < iv ){
        this.swap(i,li);
        return this.down(li);
      }
      return;
    }
    
    let ri = this.right(i);
    let rv = this.getVal(ri);

    if ( lv < rv && lv < iv ){
        this.swap(i,li);
        return this.down(li);
    }
    if ( rv < iv ){
        this.swap(i,ri);
        return this.down(ri);
    }
  }
  insert(v){
    var last = this.size();
    this.values.push(v);
    this.up(last);
  }
  getMin(){
    return this.get(0);
  }
  popMin(){
    this.swap(this.size() - 1, 0);
    let min = this.values.pop();
    this.down(0);
    return min;
  }
}

// Calculate a pair of closest points in linearithmic time
let getDistance = (ß,Ω) => {
    return Math.sqrt((ß[0]-Ω[0])**2 + (ß[1]-Ω[1])**2);
}
function closestPair(s, sbx = false) {
    // tricksy hobbitses
    if (s.length == 2) return [s[0],s[1]];
    // find midpoint `midx`
    let midx=0;
    let sbx;
    if (!sbx){   
        sbx = s.split().sort((a,b)=>{return a[0] - b[0]})
    }
    let sby = s.sort((a,b)=>{return a[1] - b[1]})
    // sort by y coord
    for (let a of s) {
        midx += a[0];
    }
    midx = midx/s.length;
    // calc min dist on l and r side
    let m = {
        l :{
            d:Infinity,
            n:[]
        },
        r : {
            d:Infinity,
            n:[]
        }
    }
    let l = {l:[],r:[]};
    ((p) => {
        for ( let a of p ){
            let s = a[0] <= midx ? "l" : "r";
            l[s].map(q=>{
                let c = getDistance(a,q);
                if (m[s].d > c){
                    m[s].d = c;
                    m[s].n = [a,q]
                }
            })
            l[s].push(a); 
        }
    })(s)
    // find min distance inside 'strip' = width d.d
    let d = m.l.d < m.r.d ? m.l : m.r;
    console.log(d.d);
    let midr = midx + d.d;
    let midl = midx - d.d;
    ((p) => {
        while ( yheap.size() > 0 ){
        // for (let a of p){
            let a = yheap.popMin();
            if ( a[0] > midl && a[0] < midr ){
                // check y distance is < d
                if ( l && a[1] - l[1] < d ){
                    let c = getDistance(a, l);
                    if (c > d.d){
                        d.d = c;
                        d.n = [a, l]
                    } 
                }
                l = a;
            }
        }
    })(s)
    return d.n;
}

let points = [];
let randpoint = () =>{
    return Math.random() * 10
}
for (var i = 0; i < 20; i++) {
    let point = [randpoint(), randpoint()];
    points.push(point);
}
min = closestPair(points);
console.log(points);
console.log(`Mininum :`, min);