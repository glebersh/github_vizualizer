const CLIENT_ID = 'Iv1.b1610e4ec3f37430';
const CLIEND_SECRET = '467915a57dcc0960c40fcf2e828a96121619efd4';

var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
  fetch(...args));
var bodyParser = require('body-parser');


var app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.get("/getAccessToken", async function (req, res) {

  const requestParams = '?client_id=' + CLIENT_ID + '&client_secret=' + CLIEND_SECRET + '&code=' + req.query.code;

  await fetch('https://github.com/login/oauth/access_token' + requestParams, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    }
  })
    .then(response => {
      response.json()
        .then(data => {
          res.json(data);
        });
    });
});

app.listen(port, function () {
  console.log('Running on port ' + port);
});
