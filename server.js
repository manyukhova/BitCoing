const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.post("/", function(req,res){
    let bitcoin = Number(req.body.bitcoin);
    let currency = req.body.currency;
    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`
    
    axios.get(url).then(function(response){
        console.log("Server status on :" + response.status);
        let price;
        if(currency === "EUR"){
            price = response.data.bpi.EUR.rate_float;
            return res.send(
                `The result of bitcoin calculation is <b><i>${Math.round((price*bitcoin) * 100) / 100}</i></b> EUR 
                <br><a href="/">Back</a>`
                );
        }else{
            price = response.data.bpi.USD.rate_float;
            result = price * bitcoin;
            return res.send(
                `The result of bitcoin calculation <b><i>${Math.round((price*bitcoin) * 100) / 100}</i></b> USD
                <br><a href="/">Back</a>`
                );/*
            return res.render(__dirname + "/index.html", {result:result});*/
        }
    });

  
});

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

/*app.listen(3000, function(){
   console.log("Server is running on port 3000");
    
});*/
app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started.");
});
