const fs = require('fs');
const http = require('http');

var pdf1 = encodeURIComponent(fs.readFileSync('a.pdf',{encoding: 'utf8'}));
var pdf2 = encodeURIComponent(fs.readFileSync('b.pdf',{encoding: 'utf8'}));

http.get('http://54.202.82.13/?name='+pdf1+'&password='+pdf2, (res) => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];
  console.log(statusCode);

  res.setEncoding('utf8');
  res.setEncoding('utf8');
  let rawData = '';

  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    console.log(rawData)
  });
});
