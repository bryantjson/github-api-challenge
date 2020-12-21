const express = require('express');
const app = express();
const port = 3000;

const calculatePayload = callback => {
  setTimeout(callback, 20000);
}

app.post('/payload', (request, response) => {
  calculatePayload(() => {
    const webhookUrl = request.params.url;


    console.log("WEBHOOK URL: " + webhookUrl);
  });
  response.status(200).send("OK");
});

app.listen(port, (err) => {
  if(err) {
    return console.log('Somethng bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});
