var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: '1234sec' })
const { Octokit } = require("@octokit/core");

console.log("TOKEN AUTH: " + process.env.tokenauth);

const octokit = new Octokit({ auth: process.env.tokenauth});

const start = async function(a,b) {
  const response = await octokit.request("GET /orgs/{org}/repos", {
    org: "github-bryant",
    type: "public",
  });

  console.log("HERE IS YOUR RESPONSE: " + response);
}


http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(3000);

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})

handler.on('issues', function (event) {

  start();
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

handler.on('repository', function (event) {


    console.log('Received a repository event for %s action=%s: #%d %s',
      event.payload.repository.name,
      event.payload.action)
  })