const express = require('express');
const app = express();
const port = 3000;

app.post('/payload', (request, response) => {
  console.log("REQUEST FROM GITHUB: " + JSON.stringify(request.body.read));
  response.send('Hello from Express!');
});

app.listen(port, (err) => {
  if(err) {
    return console.log('Somethng bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});
