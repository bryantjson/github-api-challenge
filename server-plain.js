const secret = "1234sec";
const repo = "/opt/app-root/src";


const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

console.log("START 3");

http.createServer(function (req, res) {
  req.on('data', function(chunk) {
      let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

      console.log("NEW TEST");
      if(req.headers['x-hub-signature'] == sig) {
          console.log("MATCH SIG")
          exec('cd ' + repo + ' && git pull', (error, stdout, stderr) => {
            if(error) {
                console.error(`exec error: ${error}`);
                return;
            }

            console.log(`stdout: ${stdout}`);
            console.error(`stderr: {$stderr}`);
          });
      }
  });

  res.end();
}).listen(3000);