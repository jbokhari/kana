var test1 = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

var test2 = [
    [1,2,3],
    [8,9,4],
    [7,6,5],
];
// r,r,d,d,l,l,u,r,end

var test3 = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [9, 10,11,12],
    [13,14,15,16],
];
// r,r,r,d,d,d,l,l,l,u,u,r,r,d,l,end

var test3 = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
var test4 = [[]];

function snail(arr){
    let r = [],     //result
        c = [0,0],  //current position
        d = 0,      //direction: 0 right, 1 down, 2 left, 3 up
        t;          //test move
    while(r.length < arr[0].length**2){
        let t = c.slice();
        r.push(arr[c[0]][c[1]]);
        delete arr[c[0]][c[1]];
        // check move t in current direction d
        t[1 - d % 2] += 1 - (d >> 1) * 2;
        if ( !arr[t[0]] || !arr[t[0]][t[1]] ){
            // if move invalid, undo and perform next move direction
            t = c.slice();
            d = ++d % 4;
            c[1 - d % 2] += 1 - (d >> 1) * 2;
        } else {
            // else set next move to orignal test move
            c = t;
        }
    }
    return r;
}
// getNextMove(arr,move,cur){
//     if (!this.getItem(arr,this.getNextPos(move,cur))){
//         return ++move%4;
//     }
//     return move;
// }
// getNextPos(move,cur){
//     let next = cur.slice();
//     switch (move){
//         case 0: //r
//             next[1] += 1;
//         break;
//         case 1: //d
//             next[0] += 1;
//         break;
//         case 2: //l
//             next[1] -= 1;
//         break;
//         case 3: //u
//             next[0] -= 1;;
//         break;
//     }
//     return next;
// }
// getItem(arr,pos){
//     let item;
//     try{
//         item = arr[pos[0]][pos[1]];
//     } catch(e){

//     }
//     return item;
// }

var s = solve(test3);
console.log(s);


// hasNext = 
//  = function
//  = function
//  = function 
// getItemValue = function(arr, index){
//     return arr[index];
// }
// cur = 0;
// hasNext = (arr,last) => {
//     a
// }
// while( hasNext(arr,last) )