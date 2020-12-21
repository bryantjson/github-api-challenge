// install with: npm install @octokit/webhooks
const { Webhooks } = require("@octokit/webhooks");
const webhooks = new Webhooks({
  secret: "1234sec",
});

webhooks.on("*", ({ id, name, payload }) => {
  console.log(name, "event received");
});

require("http").createServer(webhooks.middleware).listen(3000);
// can now receive webhook events at port 3000