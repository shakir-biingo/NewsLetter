const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { dirname } = require("path");

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

//list of members
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    const JsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/5d9d8661ea"
    //authentication
    const options = {
        method: "POST",
        auth: "shakir:7b20e64f258ea913c4d01bb428f45a5e-us21"
    }
    //request and pass data in json format
    const request = https.request(url, options, function (response) {
        if ( response.statusCode === 200){
            res.sendFile(__dirname +"/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    //pass data into mailchimp in json format
    request.write(JsonData);
    request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/");
})
//heroku aya doranaya port kay kuggu host greynayan || 3000 labadaba ukugu shaqeynaya both heroku and local
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})



// api : 7b20e64f258ea913c4d01bb428f45a5e-us21

//unique id list for audience : 5d9d8661ea.