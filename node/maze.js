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
      1       2
    3   4   5   6
   7 8 9 0 1 2 3 4

  Heap algorithm using array length, smallest on top
**/
class ArrayHeap {
  constructor(values=[]){
    this.values = values;
  }
  size(){
    return this.values.length;
  }
  set(i,v){
    this.values[i] = v;
  }
  getLen(i){
	return this.values[i].length;
  }
  get(i){
    return this.values[i];
  }
  swap(i,w){
    const a = this.get(i);
    const b = this.get(w);
    this.set(i,b);
    this.set(w,a);
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
      this.left(i) > (this.size() - 1)
    );
  }
  isLeaf(i){
    const li = this.left(i)
    return (li == this.size() - 1)
  }
  up(i){
    const pi = this.parent(i);
    const pv = this.get(pi);
    const pl = this.getLen(pi);
    const iv = this.get(i);
    const il = this.getLen(i);
    if ( pl > il ){
      this.swap(i,pi);
      this.up(pi);
    }
  }
  down(i){
    if ( this.isSingle(i) ){
      return;
    }

    const iv = this.get(i);
    const il = this.getLen(i);

    const li = this.left(i);
    const lv = this.get(li);
	const ll = this.getLen(li);

    if ( this.isLeaf(i) ){
      if ( ll < il ){
        this.swap(i,li);
        return this.down(li);
      }
      return;
    }
    
    const ri = this.right(i);
    const rv = this.get(ri);
    const rl = this.getLen(ri);

    if ( ll < rl && ll < il ){
        this.swap(i,li);
        return this.down(li);
    }
    if ( rl < il ){
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
    if (this.size() > 0){	
    	this.set(0, last);
    	this.down(0);
    }
    return min;
  }
}
/*
var heapTest = new ArrayHeap([]);
for (var i = 0; i < 20; i++) {
	var test = Math.ceil( Math.random() * 30 );
	var array = Array(test).fill(0); // oh my!
	// console.log(array);
	heapTest.insert(array)
}
// console.log('---')
while( heapTest.size()){
	// console.log(heapTest);
	var x = heapTest.popMin();
	console.log(x.length);
}
*/
class Somnambulist {
  constructor(grid){
    // this.grid = this.grok(grid);
    this.grid = grid;
    const character = this.getCharacter();
    this.x = character.x; 
    this.y = character.y;
    this.f = character.f; // facing dir
  }
  getCharacter(){
    var character = {};
    const grid = this.grid;
    for (var yl = grid.length, y = 0; y < yl; y++) {
      for (var xl = grid[y].length, x = 0; x < xl; x++) {
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
        }
      }
    }
    return character;
  }
  move(pos){
    this.history.push(this.getPos());
    var x = pos[0];
    var y = pos[1];
    this.x = x;
    this.y = y;
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
    const N = this.getUp(pos);
    const E = this.getRight(pos);
    const S = this.getDown(pos);
    const W = this.getLeft(pos);
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
  getUp(pos){
    const x = pos[0];
    const y = pos[1]-1;
    return [x,y];
  }
  getDown(pos){
    const x = pos[0];
    const y = pos[1]+1;
    return [x,y];
  }
  getLeft(pos){
    const x = pos[0]-1;
    const y = pos[1];
    return [x,y];
  }
  getRight(pos){
    const x = pos[0]+1;
    const y = pos[1];
    // pretty sure all grids are square, but..
    // do check of specific row anyway, w/e
    return [x,y];
  }
  bokhari(){
  	const start = this.getPos();
  	const startString = start.toString();
  	const init_path = [start];
  	let paths = new ArrayHeap();
    paths.insert(init_path);
    let solution = null;
    let explored = [startString];
    	console.log(start);

    while ( paths.size() > 0 && !this.isSolved ){
    	const path = paths.popMin();
    	const last = path[path.length-1];
    	const moves = this.getMoves(last);
    	for ( let move of moves ){
    		// console.log(move);
		  	const point = this.getThingAt(move);
    		const moveString = move.toString();
    		// console.log( moveString);
    		if ( point !== " " && point !== "!" ){
    			continue;
    		}
    		if ( explored.includes(moveString)){
    			continue;
    		}
    		const exploration = [...path];
    		exploration.push(move);
    		explored.push(moveString);
    		if ( point === "!" ){	
    			this.isSolved = true;
    			solution = exploration;
    			break;
    		}
    		paths.insert(exploration);
    	}
    }
	return solution;
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
  ];
var testMazeTwo = [
   //012345678901234567
    '#######################################',//0
    '#^                             #      #',//1
    '#                        #     #      #',//2
    '#     #                  #     #      #',//3
    '#                        #     #      #',//4
    '#                        #     #      #',//5
    '#   ## #####             #     #  # ###',//6
    '#     #                  #     # #    #',//7
    '#     #    #             ##    # #    #',//8
    '#          #             ##    # #    #',//9
    '#     #    #             ##    # #    #',//10
    '#          #             ##    # #    #',//11
    '#          #             ##    # #    #',//12
    '#          #             ##    # #    #',//12
    '#          #             ##    # #    #',//12
    '#          #             ##    # #    #',//12
    '#          #             ##    # #    #',//12
    '#          #             ##    # #    #',//12
    '#          #             ##      #    #',//12
    '#          #              #      #    #',//12
    '#          #              #      #    #',//12
    '#          #              #      #    #',//13
    '#     #    #              #      #    #',//14
    '#     #    #              #    ###    #',//15
    '#     #    #              #    #      #',//16
    '################################ ######',//17
];
var testMazeThree = [
   //0123456789012
	'#############',//0
	'# #   #      ',//1
	'#   # # ### #',//2
	'# # # #   # #',//3
	'# ###   ### #',//4
	'#  ######   #',//5
	'#     #######',//6
	'#   #       #',//7
	'##### # ### #',//8
	'#   # #   # #',//9
	'# # ####### #',//10
	'#v#         #',//11
	'#############' //12
]
var me = new Somnambulist(testMazeTwo);
console.log(me.bokhari())
function escape(maze) {
  // Have a nice sleep ;)

  return [];
}