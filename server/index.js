const express = require('express')
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors())
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
  var jsonTxt = {
    "iban": "null",
    "merchant": "Costa Coffee",
    "item": [
      {
        "quantity": "2",
        "price": "0.50",
        "name": "Water"
      },
      {
        "quantity": "1",
        "price": "2",
        "name": "Freddo espresso"
      },
      {
        "quantity": "1",
        "price": "3",
        "name": "Cappuchino"
      },
      {
        "quantity": "3",
        "price": "4",
        "name": "Sandwitch"
      }
    ],
    "total_amount": "18",
    "date_of_purchase": new Date()
  };

  res.jsonp(jsonTxt);
});
