const https = require('https');
const fs = require('fs');
const path = require('path');

// direct string path pass kora hoechhe jate undefined error na ashe
const options = {
  key: fs.readFileSync(path.join(__dirname, '../private-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../certificate.pem'))
};

https.createServer(options, (req, res) => {
   
  const {method,url}=req;

  const sendResponse = (statusCode, message) => {
    res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
    res.end(message);
  };


  //GET route
if(method==='GET'){
   if(url==='/'){
     return sendResponse(200,'welcome my chat app\n');
    }
   if(url==='/about'){
    return sendResponse(200,'this app build mahir')}
   
   if(url==='/users'){
    return sendResponse(200,'users page\n');
    }  
}

//POST route 
if(method==='POST' && url==='/message'){
   return getRequestBody(req,(body)=>{
    sendResponse(200,`message rechived :${body}\n`)
   });
}
else{
  return sendResponse(404,'Not found\n');
  }

}).listen(8000, () => {
  console.log('Server is running on https://localhost:8000/');
});


//message rechive in body use callback bacuse req.on() events are ASYNCHRONOUS 
function getRequestBody(req,callback){
    let body='';
    req.on('data',(cunk)=>{
      body+=cunk.toString();
    })

    req.on('end',()=>{
    callback(body);
    })
}