const express=require('express')
var request = require('request');
const app=express()
var text_ref,phone_Number; 
app.listen(3000)
app.set('view engine','ejs')
app.use(express.urlencoded())
app.get('/',function(req,res){
    res.send(` <style>.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #DDD7E3;
  height: 100vh;
}

.fieldset {
  border: 2px solid purple;
  width: 300px;
  padding: 10px;
}

.legend {
  color: purple;
}

.input-field {
  width: 100%;
  height: 50px;
  border: 2px solid purple;
  margin-bottom: 10px;
  padding: 5px;
}

.submit-btn {
  border: 2px solid purple;
  background-color: purple;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;
}

/* Media query for mobile devices */
@media (max-width: 768px) {
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #DDD7E3;
    height: 100vh;
    overflow: hidden;
  }
  
  .fieldset {
    width: 80%;
  }
  
  .input-field,
  .submit-btn {
    width: 100%;
  }
  
  .container.zoom {
    transform: scale(1.2);
  }
}

</style><div class="container">
  <form method="POST" action="/">
    <fieldset class="fieldset">
      <legend class="legend">Payment Information</legend>
      <input type="text" placeholder="amount" name="amount" id="inp_amount" class="input-field"required>
      <br>
      <input type="text" placeholder="First Name" name="firstName" class="input-field"required>
      <br>
      <input type="text" placeholder="Last Name" name="lastName" class="input-field "required>
      <br>
      <input type="email" placeholder="Email" name="email" id="inp_email" class="input-field "required>
      <br>
      <input type="tel" placeholder="Phone Number" name="phoneNumber" class="input-field" required>
      <br>
      <input type="text" placeholder="tex-ref" name="texRef" id="tex_ref" class="input-field" required>
      <br>
      <input type="submit" class="submit-btn">
    </fieldset>
  </form>
</div>
`)
})

app.post('/',function(req,res){
  var request = require('request');
   text_ref=req.body["texRef"];
   phone_Number=req.body["phoneNumber"];
var options = {
  'method': 'POST',
  'url': 'https://api.chapa.co/v1/transaction/initialize',
  'headers': {
    'Authorization': 'Bearer CHASECK_TEST-BjgHDyZYBnafigUcp2GtkSyIn6fYb44r',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "amount": req.body["amount"],
    "currency": "ETB",
    "email": req.body["email"],
    "first_name": req.body["firstName"],
    "last_name": req.body["lastName"],
    "phone_number":phone_Number,
    "tx_ref": text_ref,
    "callback_url": "https://webhook.site/7408d680-b6ca-4511-b889-785e90fdae29",
    "return_url": "https://chapa-pay.onrender.com/pay",
    "customization[title]": "Payment for my favourite merchant",
    "customization[description]": "I love online payments"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  const responseBody = JSON.parse(response.body);
 // res.send(responseBody.data.checkout_url);
 console.log(response);
  res.redirect(responseBody.data.checkout_url);
});
})

app.get('/pay', function(req, res) {
    //validate event
  var options = {
    'method': 'GET',
    'url': 'https://api.chapa.co/v1/transaction/verify/'+text_ref,
    'headers': {
      'Authorization': 'Bearer CHASECK_TEST-BjgHDyZYBnafigUcp2GtkSyIn6fYb44r'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const file1 = require('./index');
    const responseBody = JSON.parse(response.body);
    const amount=responseBody.data.amount
    const fname=responseBody.data.first_name
    const lname=responseBody.data.last_name
    const email=responseBody.data.email
    const reference=responseBody.data.reference
    file1.sayHello(amount,fname,lname,email,reference);
   res.send(`<style>.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.message {
  font-size: 18px;
}

.purple-text {
  color: purple;
}

/* Media queries for mobile devices */
@media (max-width: 768px) {
  .card {
    padding: 10px;
  }
  .title {
    font-size: 20px;
    margin-bottom: 8px;
  }
  .message {
    font-size: 16px;
  }
}
</style><div class="card-container">
  <div class="card">
    <h2 class="title">Payment Completed</h2>
    <p class="message">You Have Payed For The Event<span class="purple-text">Eventify</span></p>
  </div>
</div>
`);
  });
});
