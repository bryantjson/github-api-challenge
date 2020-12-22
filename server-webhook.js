var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: '1234sec' })
const { Octokit } = require("@octokit/rest");
const { Webhooks } = require("@octokit/webhooks");

console.log("TOKEN AUTH: " + process.env.PERSONAL_TOKEN);

const webhooks = new Webhooks({
  secret: "1234sec",
  path: "/webhook"
});

const octokit = new Octokit({ 
  auth: process.env.PERSONAL_TOKEN,
  userAgent: 'myApp v1.2.3',
  previews: ['jean-grey', 'symmetra'],
  timeZone: 'America/Chicago',
  baseUrl: 'https://api.github.com',
});

  

   
/*
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(3000);
*/

/*
handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})

handler.on('issues', function (event) {


  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})


handler.on('repository', function (event) {

  const nameRepo = event.payload.repository.name;
  const actionRepo = event.payload.action;

    console.log('Received a repository event for %s action=%s: #%d %s',
    nameRepo,
    actionRepo);

      octokit.issues.create({
        owner: "github-bryant",
        repo: nameRepo,
        title: "ISSUE CREATED",
        body: "New repo created! Notifying @bryantson"
      }).then((response) => {
        console.log("SUCCESS: " + JSON.stringify(response));
      });
  })

*/

webhooks.on("repository", ({ id, name, payload }) => {

  try {

    console.log(name, "event received");

    if(!payload) {
      throw "ERROR with null payload";
    }

    if(!payload.repository) {
      throw "ERROR with null payload.repository";
    }

    console.log("PAYLOAD: " + JSON.stringify(payload));

    const nameRepo = payload.repository.name;

    octokit.issues.create({
      owner: "github-bryant",
      repo: nameRepo,
      title: "ISSUE CREATED",
      body: "New repo created! Notifying @bryantson"
    }).then((response) => {
      console.log("SUCCESS: " + JSON.stringify(response));
    });

  } catch(e) {
    console.log("Entering catch block");
    console.log(e);
  } finally {
    console.log("Cleaning up");
  }

});

require("http").createServer(webhooks.middleware).listen(3000);