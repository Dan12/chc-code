// openssl rsa -in HackIM.key -out out.key -passin pass:00000
var exec = require('child_process').exec;
var cmd = 'md5 -q -s ';

var passcode = 0;

var md5 = "8c437d9ef6c7786e9df3ac2bf223445e";

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var st = new Date().getTime();

var fs = require('fs');
var brands = fs.readFileSync('brands', {encoding: 'utf8'}).split(" ");
console.log(brands.length);

function callFunc(i) {
  if(i%100 == 0)
    process.stdout.write(".");

  // console.log(brands[i])
  exec(cmd+brands[i], (error, stdout, stderr) => {
    if(stdout.trim() === md5) {
      process.stdout.write(brands[i])
    } else if(i < brands.length) {
      callFunc(i+1)
    }
  });
}

callFunc(0);
