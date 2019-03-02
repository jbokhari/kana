function bang(){
  var a = ["J", "u", "s", "t", " ", "t", "h", "r", "o", "w", " ", "l", "i", "k", "e", " ", "t", "h", "i", "s"].join('');
  try{
    a();
  }catch(e){
    e.poop=a;
  }
  a();

}