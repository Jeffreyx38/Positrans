const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
var mysql = require('mysql');

var currentUser;
var connection = mysql.createConnection({
    connectionLimit : 100,
    host : '',
    port : 3306,
    user : 'student',
    password : '',
    database : 'positrans'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected to db successful."+"\r\n")
    
  });


app.use(express.static(__dirname + "/../positrans"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/homepage', function(req, res) {
    //console.log(__dirname);
    currentUser = req.query.id;
    res.sendFile(__dirname + "/homepage.html");
  });

app.post('/login', function (req, res, next) {
  
    let username = req.body.username;
    let password = req.body.password;

    var userExist = `SELECT user_ID,NAME FROM user WHERE NAME='${username}'`;
    connection.query(userExist, function (error, result) {
        
        if (error) {
            console.log(error);
        }
        if (result.length  > 0) {
            console.log(`${username} already exists.`+"\r\n");
            let data = result[0];
            let id = data.user_ID;
            res.redirect("/homepage" + "?id=" + `${id}`);
        } else {
            // var recordInserted = `INSERT INTO user (NAME, PASSWORD) VALUES ('${username}', '${password}')`;
            // connection.query(recordInserted, function (err, result) {
            //     if (err) throw err;
            //     let id = result.insertId;
            //     console.log(`${username} record inserted.`);
            //     res.redirect("/homepage" + "?id=" + `${id}`);
            //  });
            //res.send("Please create account!");
            console.log("Please create account!");

        }
    });
  })

app.get('/newuser', function(req, res) {
    //console.log(__dirname);
    res.sendFile(__dirname + "/register.html");
});

app.get('/return', function(req, res) {
    //console.log(__dirname);
    res.sendFile(__dirname + "/loginpage.html");
});


  app.post('/register', function (req, res, next) {
  
    let username = req.body.username;
    let password = req.body.password;

    var userExist = `SELECT user_ID,NAME FROM user WHERE NAME='${username}'`;
    connection.query(userExist, function (error, result) {
        
        if (error) {
            console.log(error);
        }
        if (result.length  > 0) {
            console.log(`${username} already exists.`+"\r\n");
            let data = result[0];
            let id = data.user_ID;
            res.send(`${username} already exists.`+"\r\n")
            //return user exist 
            //res.redirect("/homepage" + "?id=" + `${id}`);
        } else {
            var recordInserted = `INSERT INTO user (NAME, PASSWORD) VALUES ('${username}', SHA1('${password}'))`;
            connection.query(recordInserted, function (err, result) {
                if (err) throw err;
                let id = result.insertId;
                console.log(`${username} record inserted.`);
                res.send(`${username} record inserted.`)
                //res.redirect("/homepage" + "?id=" + `${id}`);

             });
        }
    });
  })






    app.post('/observation', function (req, res, next) {
        console.log(currentUser);

        let observation = req.body.observation;

        console.log(observation);

        var recordInserted = `INSERT INTO observation (user_ID, OBSERVATION) VALUES (${currentUser}, '${observation}')`;
            connection.query(recordInserted, function (err, result) {
                if (err) throw err;
                console.log(`Observation inserted to user ID: ${currentUser}.`);
                res.redirect("/homepage" + "?id=" + `${currentUser}`);
             });

        // let id = req.url;
        // console.log(id);
    });


    app.get('/mylist', function(req, res) {
        //console.log(__dirname);
        res.sendFile(__dirname + "/mylist.html");
    });

    app.get('/logout', function(req, res) {
        //console.log(__dirname);
        res.sendFile(__dirname + "/loginpage.html");
    });

    app.get('/goback', function(req, res) {
        //console.log(__dirname);
        res.redirect("/homepage" + "?id=" + `${currentUser}`);
    });

    app.get('/getobservation', function(req, res) {


        var observatioQuery = `SELECT OBSERVATION, DATE 
        FROM user, observation 
        WHERE (user.user_ID = observation.user_ID) 
        AND (observation.user_ID = ${currentUser});`;
        connection.query(observatioQuery, function (err, result) {
            if (err) throw err;
            let record = JSON.parse(JSON.stringify(result));
            res.send(record);
        });


    });







    



app.listen(8000, () => {
    console.log('App listening on port 8000!')
  });