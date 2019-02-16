function dirReduc(arr){
  var t =[]
  for (var i of arr){
    let h = t.length>0?t.slice(-1)[0][0]:'',
        n = i[0],
        c = h+n,
        b = (c == "WE" || c == "EW" || c == "SN" || c == "NS" ) ? t.pop() : t.push(i);
  }
  return t;
}

Test.assertSimilar(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]), ["WEST"])
Test.assertSimilar(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]), ["NORTH", "WEST", "SOUTH", "EAST"])
Test.assertSimilar(dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]), [])
