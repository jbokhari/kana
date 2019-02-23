var points = [
      [2,2], // A
      [2,8], // B
      [5,5], // C
      [6,3], // D
      [6,7], // E
      [7,4], // F
      [7,9]  // G
    ];

function getDistance(ß,Ω){
    return Math.sqrt((ß[0]-Ω[0])**2 + (ß[1]-Ω[1])**2);
}
function closestPair(s, sbx = false ) {
    
    if ( !sbx ) s.sort((a,b)=>{ return a[0] - b[0]; });

    if ( s.length > 3 ){
        let lchunk = s;
        let rchunk = lchunk.splice(0, Math.ceil(lchunk.length/2));

        let lmin = closestPair(lchunk, true);
        let rmin = closestPair(rchunk, true);
    } else {
        for ( let a of lmin ){
            lchunk
        }
    }



}
closestPair(points);