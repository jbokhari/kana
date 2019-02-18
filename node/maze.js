// Return the array of movements to execute to get out of the maze

/**
  Min-heap based on array length
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
class Somnambulist {
  constructor(grid){
    // this.grid = this.grok(grid);
    this.grid = grid;
    const character = this.getCharacter();
    this.x = character.x; 
    this.y = character.y;
    this.f = character.f; // facing dir
    this.story = []; // the final story, as it were
  }
  /**
   * Return { 
       x, // character x
       y, // character y
       f  // character facing direction
   * }
   **/
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
  /**
   * Check is position is final
   **/
  isOutOfBounds(move){
    const x = move[0];
    const y = move[1];
    const grid = this.grid;
    if (y>=0 && y<grid.length && x>=0 && x<grid[y].length){
      return false;
    }
    return true;
  }
  /**
   * Return ALL moves from position
   **/
  getMoves(pos){
    let moves = [];
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
  /**
   * Return character position as [x,y]
   **/
  getStartingPosition(){
    return [this.x,this.y];
  }
  /**
   * Return item at grid point
   * E.g., " " or "#"
   * if "out of bounds" then returns "!", aka you win!
   **/
  getThingAt(pos){
    if (this.isOutOfBounds(pos))
      return "!";
    const x = pos[0];
    const y = pos[1];
    return this.grid[y][x];
  }
  /**
   * Get one point up from `pos`
   */
  getUp(pos){
    const x = pos[0];
    const y = pos[1]-1;
    return [x,y];
  }
  /**
   * Get one point down from `pos`
   */
  getDown(pos){
    const x = pos[0];
    const y = pos[1]+1;
    return [x,y];
  }
  /**
   * Get one point left from `pos`
   */
  getLeft(pos){
    const x = pos[0]-1;
    const y = pos[1];
    return [x,y];
  }
  /**
   * Get one point right from `pos`
   */
  getRight(pos){
    const x = pos[0]+1;
    const y = pos[1];
    // pretty sure all grids are square, but..
    // do check of specific row anyway, w/e
    return [x,y];
  }
  /**
   * Dijkstra-esque algorithm to find shortest path
   * Return null if no solution
   */
  solve(){
  	const start = this.getStartingPosition();
  	const startString = start.toString();
  	const init_path = [start];
  	let paths = new ArrayHeap();
    paths.insert(init_path);
    let explored = [startString];
    let solution = [];

    while ( paths.size() > 0 && !this.isSolved ){
    	const path = paths.popMin();
    	const last = path[path.length-1];
    	const moves = this.getMoves(last);
    	for ( let move of moves ){
		  	const point = this.getThingAt(move);
    		const moveString = move.toString();
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
  getInstruction(){
  	const solution = this.solve();
  	let dir = this.f;
  	let newDir = dir;
  	while( solution.length > 0 ){
  		var pos2 = pos1 || null;
  		var pos1 = solution.shift();
  		if ( ! pos2 )
  			continue;
	  	const x1 = pos1[0];
	  	const y1 = pos1[1];
	  	const x2 = pos2[0];
	  	const y2 = pos2[1];
	  	// positive change is right (E)
	  	const dx = x1 - x2;
	  	// positive change is down (S)
	  	const dy = y1 - y2;

	  	if (dy === 1){
	  		newDir = "S";
	  	}
  		if (dy === -1){
  			newDir = "N";
  		}
  		if (dx === 1){
  			newDir = "E";
  		}
  		if (dx === -1){
  			newDir = "W";
  		}
	  	const orient = this.getTurns(dir, newDir);
	  	if (orient){
			this.story.push(orient)
	  	}
		this.story.push("F");
		dir = newDir;
  	}
  	return this.story;

  }
  getTurns(dir, newDir){
  	if ( !newDir || dir === newDir){
  		return;
  	}
    const i = [null, "R", "B", "L"]
  	const r = {"N" : 0, "E" : 1, "S" : 2, "W" : 3};
  	// positive change is R
  	const count = (r[newDir] - r[dir] + 4) % 4;
	return i[count];
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
    '##########'  //7
  ];

function escape(maze) {
	const me = new Somnambulist(maze);
	return me.getInstruction();
}
console.log(escape(testMaze));