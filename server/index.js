const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));



app.get('/qrcode', function(req, res) {
  res.jsonp({
    id: "billId"
  });
});

app.get('/bocredirect', function (req, res) {
  console.log(res);
  res.jsonp(res.body);
});


app.get('/qrcodeurl', function (req, res) {
  var db = {
    "iban": "null",
    "merchant": "Porfi cafe",
    "item": [
      {
        "quantity": "2",
        "price": "0.50",
        "name": "water"
      },
      {
        "quantity": "1",
        "price": "2",
        "name": "freddo espresso"
      },
      {
        "quantity": "1",
        "price": "3",
        "name": "cappuchino"
      },
      {
        "quantity": "3",
        "price": "4",
        "name": "sandwitch"
      }
    ],
    "total_amount": "18",
    "date_of_purchase": "",
  };

  myData = JSON.parse(jsonTxt, function (key, value) {
    if (key === 'date_of_purchase') { return new Date(); }
    //any additonal custom logic you may need later...
  });

  res.jsonp(db);
});
