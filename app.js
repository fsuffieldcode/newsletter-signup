const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
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

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/dbd65cffae",
        method: "POST",
        headers: {
            "Authorization": "angela1 b36750618508b3c564f5f6e8102e0dd0-us20"
        }
    };
    
    request(options, (error, response, body) => {
        if (error) {
            console.log("error");
        } else {
            console.log(response.statusCode);
        }
    });

});



// API key
// b36750618508b3c564f5f6e8102e0dd0-us20

// List ID
// dbd65cffae