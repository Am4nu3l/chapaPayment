const express=require('express')
var crypto = require('crypto');
var request = require('request');
var secret = process.env.SECRET_KEY;
const app=express()

app.listen(3000)
app.set('view engine','ejs')
app.use(express.urlencoded())
app.get('/',function(req,res){
    res.send(` <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <form method="POST" action="/">
      <fieldset style="border: 2px solid purple; width: 300px; padding: 10px;">
        <legend style="color: purple;">Payment Information</legend>
        <input type="text" placeholder="First Name" name="firstName" style="border-color: purple;"><br>
        <input type="text" placeholder="Last Name" name="lastName" style="border-color: purple;"><br>
        <input type="email" placeholder="Email" name="email" style="border-color: purple;"><br>
        <input type="tel" placeholder="Phone Number" name="phoneNumber" style="border-color: purple;"><br>
        <label>
          <input type="radio" name="gender" value="male" style="border-color: purple;"> Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" style="border-color: purple;"> Female
        </label><br>
        <input type="submit" style="border-color: purple;">
      </fieldset>
    </form>
  </div>`)
})

app.post('/',function(req,res){
   var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api.chapa.co/v1/transaction/initialize',
  'headers': {
    'Authorization': 'Bearer CHASECK_TEST-IjiumdwjjtyyHauZeofjFkm2248FIVG4',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "amount": "100",
    "currency": "ETB",
    "email": req.body["email"],
    "first_name": req.body["firstName"],
    "last_name": req.body["lastName"],
    "phone_number": req.body["phoneNumber"],
    "tx_ref": "gtrftrd",
    "callback_url": "https://webhook.site/b6f1d7b2-e3e5-4e47-8da0-7727c6ae4980",
    "return_url": "http://localhost:3000/pay",
    "customization[title]": "Payment for my favourite merchant",
    "customization[description]": "I love online payments"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  const responseBody = JSON.parse(response.body);
  res.send(responseBody.data.checkout_url);
});
})

app.get('/pay', function(req, res) {
    //validate event
  var options = {
    'method': 'GET',
    'url': 'https://api.chapa.co/v1/transaction/verify/gtrftrd',
    'headers': {
      'Authorization': 'Bearer CHASECK_TEST-IjiumdwjjtyyHauZeofjFkm2248FIVG4'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const responseBody = JSON.parse(response.body);
    res.send(responseBody.data.first_name);
  });
});
