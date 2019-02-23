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
var heapTest = new Heap("rank",[]);
for (var i = 0; i < 10; i++) {
    var test = {"kyu" : heapTest.size(), "honor":Math.floor( Math.random() * 10 )};
    heapTest.insert(test)
}
var y;
var x;
var isLess = true;
while( heapTest.size()){
    y = x;
    x = heapTest.popMin();
    console.log(x, isLess);
    if (!y){ 
      continue;
    }
    isLess = x["rank"] >= y["rank"] && isLess;
    y = x;
}
console.log(isLess);