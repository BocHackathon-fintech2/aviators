const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.jsonp({
    name: "BBBB"
  });
});

app.login('/login', (req, res) => {

});

app.listen(3000, () => console.log('Gator app listening on port 3000!'));