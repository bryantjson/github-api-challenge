var http = require('http');

const { Octokit } = require("@octokit/rest");
const { Webhooks } = require("@octokit/webhooks");

console.log("TOKEN AUTH: " + process.env.PERSONAL_TOKEN);
console.log("GITHUB WEBHOOK SECRET: " + process.env.GITHUB_WEBHOOK_SECRET);

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

  const nameRepo = payload.repository.name;
  const owner = "github-bryant";

  try {

    console.log(name, "event received");

    if(!payload) {
      throw "ERROR with null payload";
    }

    if(!payload.repository) {
      throw "ERROR with null payload.repository";
    }

    console.log("PAYLOAD: " + JSON.stringify(payload));


    octokit.issues.create({
      owner: owner,
      repo: nameRepo,
      title: "ISSUE CREATED",
      body: "New repo created! Notifying @bryantson"
    }).then((response) => {
      console.log("SUCCESS IN CREATING ISSUE: " + JSON.stringify(response));
    });


  } catch(e) {
    console.log("Entering catch block");
    console.log(e);
  } finally {
    console.log("Cleaning up");
  }



  try {

    octokit.repos.createOrUpdateFileContents({
        owner: owner,
        repo: nameRepo,
        path: "README.md",
        message: "Created README.md",
        content: "R2V0IFN0YXJ0ZWQ=",
        committer: {
          name: "Bryant Son",
          email: "jison1984@gmail.com"
        },
        author: {
          name: "Bryant",
          email: "lovepool@utexas.edu"
        }
      }).then((response) => {
        console.log("SUCCESS IN Creating file : " + JSON.stringify(response));
      });
  } catch(e) {
    console.log("Entering creating file catch block");
    console.log(e);
  } finally {
    console.log("Cleaning up 2nd");
  }

  try {

    octokit.repos.setAdminBranchProtection({
      owner: owner,
      repo: nameRepo,
      branch: "master"
      }).then((response) => {
        console.log("SUCCESS IN UPDATING BRANCH: " + JSON.stringify(response));
      });
  } catch(e) {
    console.log("Entering protection catch block");
    console.log(e);
  } finally {
    console.log("Cleaning up 3rd");
  }

});

http.createServer(webhooks.middleware).listen(3000);



