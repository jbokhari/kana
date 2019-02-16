// Return the array of movements to execute to get out of the maze
var pos = [
  0,//x
  0,//y
];
// for the purpose of this kana we rep bottom left as 0,0
// then bot left as [0,n]... etc...
// where n is height of grid-1
// 0,0 1,0 etc ...
// 0,1 1,1 ...
// etc ...
// ...
// this isn't a classica grid but works better...
// with the js array

/**
         0
      1      2
    3   4   5   6
   7 8 9 0 1 2 3 4
**/
class Heap {
  constructor(values=[]){
    this.values = values;
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
  parent(i){
    return Math.floor(i/2);
  }
  left(i){
    return (2*i+1);
  }
  right(i){
    return (2*i+2);
  }
  isSingle(i){
    return (
      i == this.size() - 1
    );
  }
  isLeaf(i){
    let li = this.left(i)
    return (li == this.size() - 1)
  }
  swap(i,w){
    const a = this.get(i);
    const b = this.get(w);
    this.set(i,b);
    this.set(w,a);
  }
  up(i){
    let pi = this.parent(i);
    let pv = this.get(pi);
    let iv = this.get(i);
    if ( pv > iv ){
      this.swap(i,pi);
      this.up(pi);
    }
  }
  down(i){
    if ( this.isSingle(i) ){
      return;
    }

    let iv   = this.get(i);

    let li = this.left(i);
    let lv = this.get(li);
    if ( this.isLeaf(i) ){
      if ( lv < iv ){
        this.swap(i,li);
        return this.down(li);
      }
      return;
    }
    
    let ri = this.right(i);
    let rv = this.get(ri);

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
    var min = this.getMin();
    var last = this.values.pop();
    this.set(0,last);
    this.down(0);
    return min;
  }
}
var heapTest = new Heap();


class Somnambulist {
  constructor(grid){
    // this.grid = this.grok(grid);
    this.grid = grid;
    const character = this.getCharacter();
    this.x = character.x; 
    this.y = character.y;
    this.f = character.f; // facing dir
    this.history = []; //history of moves
    this.explored = [[this.x,this.y]]
  }
  getCharacter(){
    var character = {};
    const grid = this.grid;
    for (var yl = grid.length, y = 0; y < yl; y++) {
      for (var xl = grid.length, x = 0; x < xl; x++) {
        if ( grid[y][x] !== ' ' && grid[y][x] !== "#" ){
          switch ( grid[y][x] ){
            case "^":
              character.f = "N";
            break;
            case ">":
              character.f = "E";
            break;
            case "v":
              character.f = "S";
            break;
            case "<":
              character.f = "W";
            break;
          }
          character.x = x;
          character.y = y;
          // grid[y][x] = " "; // for search algorithm later on
        }
      }
    }
    return character;
  }
  // we'll get to it
  // directly change position
  explore(pos, history){
    history.push(this.getPos());
    var x = pos[0];
    var y = pos[1];
    this.x = x;
    this.y = y;
    this.mark(pos);
    return history;
  }
  move(pos){
    this.history.push(this.getPos());
    var x = pos[0];
    var y = pos[1];
    this.x = x;
    this.y = y;
  }
  // mark position as explored
  mark(pos){
    var asString = pos.toString();
    this.explored.push(asString);
  }
  isMarked(pos){
    var asString = pos.toString();
    return this.explored.includes(asString);
  }
  /*
    check is position is final
  */
  isOutOfBounds(move){
    const x = move[0];
    const y = move[1];
    const grid = this.grid;
    if (y>=0 && y<grid.length && x>=0 && x<grid[y].length){
      return false;
    }
    return true;
  }
  getMoves(pos){
    let moves = [];
    // temporary
    // this.explore(pos);
    this.x = pos[0];
    this.y = pos[1];
    const N = this.getUp();
    const E = this.getRight();
    const S = this.getDown();
    const W = this.getLeft();
    moves.push(N);
    moves.push(E);
    moves.push(S);
    moves.push(W);
    return moves;
  }
  getPos(){
    return [this.x,this.y];
  }
  getThingAt(pos){
    if (this.isOutOfBounds(pos))
      return "!";
    const x = pos[0];
    const y = pos[1];
    return this.grid[y][x];
  }
  getUp(){
    const x = this.x;
    const y = this.y-1;
    return [x,y];
  }
  getDown(){
    const x = this.x;
    const y = this.y+1;
    return [x,y];
  }
  getLeft(){
    const x = this.x-1;
    const y = this.y;
    return [x,y];
  }
  getRight(){
    const x = this.x+1;
    const y = this.y;
    // pretty sure all grids are square, but..
    // do check of specific row anyway, w/e
    return [x,y];
  }
  makelinks(){
    /**
    links = {
      '4,4' { '4,3' }
      '4,3' { '5,3 }
      '5,3' { '6,3', '5,3' }
      '6,3' { '6,4' }
      '6,4' { '6,5' }
      '6,5' { '6,6' }
      '6,6' { '5,6' }
      '5,6' { '4,6' }
      '4,6' { '3,6' }
      '3,6' { '2,6' }
      '2,6' { '1,6', '2,5' }
      ...
    }
    **/
    var position = this.getPos();
    var queue = [position];
    let links = {};
    let marked = [];
    while(queue.length > 0){
      var currentPos = queue.shift();
      var moves = this.getMoves(currentPos);
      var cpstring = currentPos.toString();
      links[cpstring] = [];
      for (var move of moves) {
        let mstring = move.toString();
        if (this.getThingAt(move) !== " ")
          continue;
        if (this.getThingAt(move) === "!"){ 
          history.push(move);
          queue = [];
          break;
        }
        links[cpstring].push(mstring)
        if ( !links[mstring] )
          queue.push(move)
      }
      // break;
    }
    return links;
    // if we get here its unsolvable
  }
  shortest_path(links){
    var queue = [];
    var marked = [];
    var distance_so_far = 0;
    while ( queue.length > 0 ){
      var current = queue.pop();
      marked.push(current);
      // distance_so_far = try_move(current, )
      // var 
    }
  }

}
var testMaze = [
  // 0123456789
    '##########', //0
    '#        #', //1
    '#  ##### #', //2
    '#  #   # #', //3
    '#  #^# # #', //4
    '#  ### # #', //5
    '#      # #', //6
    '######## #'  //7
  ]
var me = new Somnambulist(testMaze);

console.log(me.makelinks())
function escape(maze) {
  // Have a nice sleep ;)

  return [];
}