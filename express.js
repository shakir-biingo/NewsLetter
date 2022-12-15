const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { dirname } = require("path");
const { response } = require("express");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function (req, res) {
    res.sendFile(__dirname + "/singup.html");

})
//post request
app.post("/", function (req, res) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_field: {
                FNAME: firstname,
                LNAME: lastname
            }

        }]
    }
    
    const JsonData = JSON.stringify(data);

        const url ="https://us21.api.mailchimp.com/3.0/lists/5d9d8661ea";
        const option = {
            method : "POST",
            auth : "shakir2:7b20e64f258ea913c4d01bb428f45a5e-us21"
        }
          const request =  https.request(url, option, function (response) {
                response.on("data",function(data){
                    console.log(data);
                })
            })

        request.write(JsonData);
        request.end();
    });


    // api : 7b20e64f258ea913c4d01bb428f45a5e-us21

//unique id list for audience : 5d9d8661ea.