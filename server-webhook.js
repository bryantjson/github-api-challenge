var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: '1234sec' })
const { Octokit } = require("@octokit/rest");

console.log("TOKEN AUTH: " + process.env.PERSONAL_TOKEN);

const octokit = new Octokit({ 
  auth: process.env.PERSONAL_TOKEN,
  userAgent: 'myApp v1.2.3',
  previews: ['jean-grey', 'symmetra'],
  timeZone: 'America/Chicago',
  baseUrl: 'https://api.github.com',
});

  

   

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

  octokit.issues.create({
    owner: "github-bryant",
    repo: "github-api-challenge",
    title: "New Issue 101",
    body: "Howdy! This is from GitHub code @mention bryantson"
  }).then((response) => {
    console.log("SUCCESS: " + response);
  });

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