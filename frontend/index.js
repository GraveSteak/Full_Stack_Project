//CIS 3368 Sprint 2 Code
//Kenneth Rodriguez and Garvin Phan 
//https://getbootstrap.com/docs/4.0/components/buttons/
//https://getbootstrap.com/docs/4.0/components/forms/
//https://icons.getbootstrap.com/?q=person
//https://icons.getbootstrap.com/icons/rocket-takeoff/
//https://icons.getbootstrap.com/icons/box/
//https://icons.getbootstrap.com/icons/person-badge-fill/

const express = require('express')
var path = require('path');
var bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 8080;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder
app.use(express.static('./public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// render login as default page 
app.get('/',function (req, res) {
    res.render('pages/login.ejs')
});

// render spaceship as default page 
app.get('/',function (req, res) {
    res.render('pages/spaceship.ejs')
});

// render captain as default page 
app.get('/',function (req, res) {
    res.render('pages/captain.ejs')
});

// presents a login requirement and renders the login page
app.post('/process_login', function(req, res){
    var login_url = "http://127.0.0.1:5000/api/login"
    var username = req.body.username;
    var password = req.body.password;
    let config = {
        headers: {
            username: username,
            password: password
        }
    }
// if statement that authenticates the login credentials and initiates an action based on credentials
    axios.get(login_url, config)
        .then((response)=>{
            let api_response = response.data
            if (api_response == "UNAUTHORIZED USER"){ // backend api returns "UNAUTHORIZED USER" if credentials are wrong
                res.render('pages/login.ejs', { // if correct then it will load welcome page
                api_response: api_response
            });
        } else{ 
                res.render('pages/home.ejs', { // loads cargo home page 

                  });
            
        }
    
  })
})

app.get('/home',function (req, res) {
        res.render('pages/home.ejs', { // loads cargo home page 
            });
});


app.get('/spaceship', function(req, res){ 
        res.render('pages/spaceship.ejs', { // loads spaceship page   
          });
        });

app.get('/captain', function(req, res){
    res.render('pages/captain.ejs', { // loads spaceship page   
    });
});


app.listen(port, () => console.log(`Started on port ${port}!`));