// openssl rsa -in HackIM.key -out out.key -passin pass:00000
var exec = require('child_process').exec;
var cmd = 'openssl rsa -in HackIM.key -out out2.key -passin pass:';

var passcode = 0;

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var st = new Date().getTime();

function callFunc(i) {
  exec(cmd+pad(i, 6), (error, stdout, stderr) => {
    // console.log(i+' , '+stderr.length);
    if(stderr.length < 20) {
      console.log(i);
    } else
      callFunc(i+1);
  });
  if(i%1000 == 0) {
    process.stdout.write(".");
  }
  if(i % 10000 == 0) {
    console.log(new Date().getTime() - st);
    console.log(i);
  }
}

callFunc(141000);
