var alpha = "abcdefghijklmnopqrstuvwxyz";
fs = require('fs');

var datao = fs.readFileSync('script.txt', {encoding:'utf8'}).split("\n\n");
var data = fs.readFileSync('originalscript.txt', {encoding:'utf8'}).split("\n\n");

for(var i = 0; i < datao.length; i++) {
  var wordso = datao[i].replace(new RegExp("  ", 'g'), "").split(" ");
  var words = data[i].replace(new RegExp("  ", 'g'), "").split(" ");
  if(wordso.length != words.length) {
    console.log(data[i])
    console.log("")
    console.log(datao[i])
    break;
  }
}
