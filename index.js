const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
// app.use(express.static('/'));
router.get('/home', (req,res) => {
  res.sendFile(__dirname + '/home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  fs.readFile(__dirname + '/user.json', 'utf-8', (error, data) => {
    res.send(data)
  })
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

// Using query string parameter 
// http://localhost:8081/login?username=bret&password=bret@123
router.get('/login', (req,res) => {
  fs.readFile(__dirname + '/user.json', 'utf-8', (error, data) => {
    let user = JSON.parse(data.toString());
    let username = req.query.username;
    let password = req.query.password;

    let answer = {
      message: "You did not enter a query paRAMS"
    }

    //If username and  passsword is valid then send resonse as below
    if(username === user.username && password === user.password) {
        //creating object
        answer = {
          status: true,
          message: "User Is valid"
        }
    }
    else if (username != user.username){
        answer = {
          status: false,
          message: "User Name is invalid"
        }
    }
    else if(password != user.password){
        answer = {
          status: false,
          message: "Password is invalid"
        }
    }
    res.send(answer);
  })
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/

//Using PARAMS
//http://localhost:8081/logout/bret
router.get('/logout/:username', (req,res) => {
  let username = req.params.username;
  res.send(`<b>${username} successfully logout.<b>`);
});

app.use('/', router);
app.listen(process.env.port || 8081);
console.log('Web Server is listening at port '+ (process.env.port || 8081));