const express = require("express");
const bodyParser = require("body-parser");
const engines = require("consolidate");
const paypal = require('paypal-rest-sdk');
const { response } = require("express");

const pay = express();

pay.engine("ejs", engines.ejs);
pay.set("views", "./views");
pay.set("view engine", "ejs");

pay.use(bodyParser.json());
pay.use(bodyParser.urlencoded({extended: true}));

paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: 'AdvS9VmwEihWiUUTi3bU2cuMZZ8tBmOoJ9ddV9dcFpYNBzca-ylYjJkdqjmGrYfbz6_ZOSvAp84b9pSj',
    client_secret: 'ELxGtB6dIsFhpbP9sVkito_Ucx5WyNt3RI-E3BIlGZhFZWWdjFsxokfyhF_c0_wo-2A9QmDPOuGpcDvE'
  });

pay.get("/", (req, res) => {
    res.render("index");
});

pay.get("/paypal", (req, res) => {

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://10.139.74.195:3000/success",
            "cancel_url": "http://10.139.74.195:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "110",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "110"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href);
        }
    });
    
});

pay.get("/success", (req, res) => {
   // res.send("Success");
   var PayerID = req.query.PayerID;
   var paymentId = req.query.paymentId;
   var execute_payment_jeson = {
       "payer_id": PayerID,
       "transactions": [{
           "amount":{
               "currency":"USD",
               "total": "110"
           }
       }]
   };

   

   paypal.payment.execute(paymentId, execute_payment_jeson, function(error, payment){
       if(error) {
           console.log(error.response);
           throw error;
       } else {
           console.log("Get Payment Response");
           console.log(JSON.stringify(payment));
           res.render('success');
       }
   });

});

pay.get("/cancel", (req, res) => {
    res.render("cancel");
});




pay.listen(3000, () =>{
    console.log("server is run");
});