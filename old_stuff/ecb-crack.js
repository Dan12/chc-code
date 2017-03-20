// script to do byte-at-a-time ecb decryption

// global
var numBlocks = 3;
var blocksize = 16;

var secret = [];

var total = 126;

var url = "chc.cs.cornell.edu";
var port = 1339;

// set at each byte inc
var fin = 0;

var input = "";

var addition = "";

var testByte = "";

// get the data from the server, seems to be a bit faster than command line
var net = require('net');
var dataFunc = function(toWrite, callback) {
  var client = new net.Socket();

  client.connect(port, url, function() {
  	client.write(toWrite+'\n');
  });

  client.on('data', function(data) {
    var hexDump = "";
    for(var i = 0; i < data.length; i++) {
      // console.log(data[i]);
      var byte = data[i].toString(16);
      if(byte.length == 1) {
        byte = "0"+byte;
      }
      hexDump += byte;
    }
  	client.destroy(); // kill client after server's response
    callback(hexDump);
  });
}

// other func, command line, only linux
// var exec = require('child_process').exec;
// dataFunc = function(toWrite, callback) {
//   exec('echo "'+toWrite+'" | nc '+url+' '+port+' | xxd -ps', function(e, s, st) {
//     if (e !== null) {
//       console.log(`exec error: ${error}`);
//     } else {
//       var hexDump = s.replace(new RegExp("\n", 'g'),"");
//       callback(hexDump);
//     }
//   });
// }


// return only the required bytes
var stripblock = function(str) {
  return str.substring(0,blocksize*2*numBlocks);
}

// callback when server call is finished
var callback = function() {
  fin++;
  if(fin >= total) {
    console.log("\nunable to find char in range.");
  } else {
    setDictResult(fin);
  }
}

// get the server result when appending the character with charCode z
// if it matches testByte, then the next secret byte is z
var setDictResult = function(z) {
  // ignore problematic characters
  if(z >= 40 && z != 96 && z != 92){
    process.stdout.write(String.fromCharCode(z));
    var test = input+addition+String.fromCharCode(z);

    dataFunc(test, function(hexDump) {
      if(stripblock(hexDump) === testByte) {
        console.log("\nFound matching char: "+String.fromCharCode(z));
        secret.push(String.fromCharCode(z));
        // we found the next byte so move on
        startFunc();
      } else {
        // we have not found the byte so try the next one
        callback();
      }
    });
  } else {
    callback();
  }
}

var iters = -1;
// start cracking the secret
var startFunc = function() {
  iters++;
  if(iters < blocksize*numBlocks) {
    fin = 0;
    input = "";
    addition = "";
    testByte = "";
    // construct the 1 byte less input
    for(var i = 0; i < (blocksize*numBlocks-1)-secret.length; i++){
      input+="a";
    }
    // construct the current secret
    for(var i = 0; i < secret.length; i++) {
      addition+=secret[i];
    }
    console.log("\nCurrent secret: "+secret.join(""));
    console.log("\nTrying:")

    dataFunc(input, function(hexDump) {
      testByte = stripblock(hexDump);
    })

    setDictResult(fin);
  } else {
    console.log("\n"+secret.join(""));
  }
}

var initSize = 0;

// get the block size of one more byte
var getByteSize = function(s) {
  console.log("trying size "+s)
  var vector = "";
  for(var l = 0; l < s; l++) {
    vector += "a";
  }

  dataFunc(vector, function(hexDump) {
    if(hexDump.length != initSize) {
      console.log("Found size: "+s);
      blocksize = s;
      // we've determined block size, start cracking the secret
      startFunc();
    } else {
      getByteSize(s+1);
    }
  });
};

// get the initial block size
dataFunc("a", function(hexDump){
  initSize = hexDump.length;

  getByteSize(2);
});
