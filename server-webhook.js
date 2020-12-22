var http = require('http')

const { Octokit } = require("@octokit/rest");
const { Webhooks } = require("@octokit/webhooks");

console.log("TOKEN AUTH: " + process.env.PERSONAL_TOKEN);

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET,
  path: "/webhook"
});

const octokit = new Octokit({ 
  auth: process.env.PERSONAL_TOKEN,
  userAgent: 'myApp v1.2.3',
  previews: ['jean-grey', 'symmetra'],
  timeZone: 'America/Chicago',
  baseUrl: 'https://api.github.com',
});

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

http.createServer(webhooks.middleware).listen(3000);