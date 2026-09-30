const https = require('https');
const fs = require('fs');
const path = require('path');

// direct string path pass kora hoechhe jate undefined error na ashe
const options = {
  key: fs.readFileSync(path.join(__dirname, '../private-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../certificate.pem'))
};

https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('hello world\n');
}).listen(8000, () => {
  console.log('Server is running on https://localhost:8000/');
});