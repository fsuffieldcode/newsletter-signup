const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const api_key = process.env.API_KEY;

console.log(process.env);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

// program the post route.

// use bodyparser to grab data from form and console log from server

app.post("/", (req, res) => {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data)

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/dbd65cffae",
        method: "POST",
        headers: {
            "Authorization": "fabian7 " + api_key
        },
        body: jsonData
    };
    
    request(options, (error, response, body) => {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

});

app.post("/failure", (req, res) => {
    res.redirect("/");  
})