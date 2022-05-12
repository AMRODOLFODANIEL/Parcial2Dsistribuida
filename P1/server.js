// server.js
'use strict'
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require('express-session');
const app = express();
const md5 = require('md5');
const connection = require('./config/mysql.js');
const res = require('express/lib/response');
app.use(bodyParser.urlencoded ({ extended: false }))
app.use (express.static('public'));
app.set('view engine', 'pug');
  app.use (cookieParser ());
  app.use (session({
    secret: 'keyboard cat',
     resave: true,
    saveUninitialized: true,
    cookie: {
       maxAge: 60000
     }
  }));
app.get('/', function(req, res, next) {
  if(req.session.username){
    res.render('home')
  }else{
    res.render ('index');
  }
});
app.post('/auth', function(req, res, next){
  if(req.body.sesion == ""){
    let pass = req.body.pass
    
    var sql = 'SELECT id, username, email FROM telematica4c.users WHERE email="'+ req.body.email + '"AND pass="' + pass +'"';
    console.log(sql)
    connection.query(sql , (err, resp, fields)=>{
      if(resp.length){
          req.session.userid = resp[0].id;
          req.session.username= resp[0].username;
          req.session.correo = resp[0].email;
          res.redirect('/dash');
      }else{
          res.redirect('/404');
      }
  });
    }else{
    res.redirect('/registro');
    }
    });
    app.get('/sesion', function(req, res, next){
    res.send (req.session);
    });
    app.get('/home', function(req, res, next){
      res.render('home');
      });
    app.get("/registro", function (req, res, next){
      res.render ("registro")
    })
    app.get("/404", function (req, res, next){
      res.render ("404")
    })
    app.get('/cerrar', function(req, res, next){
    req.session.destroy();
    });
    app.get('/dash',(req, res)=>{
      res.render('dash')
    })

    //post de la base de datos connexion
    app.post('/registroUser', function(req, res, next){
      /*let sql ='INSERT  (username,email,pass)' [ req.body.username,req.body.email,req.body.pass];
        connection.query(sql);*/
        connection.query('INSERT INTO users(username,email,pass) VALUES (?,?,?)',[ req.body.username,req.body.email,req.body.pass])
        res.redirect('/')
      });
//codigo profe chat server.js post auth , 404
/*    
app.get('/', function(req, res) {
  if(req.session.username) {
  res.render('home');
  } else {
  res.render('index');
  }
  });


  app.post('/auth', function (req, res, next) {
  if(req.body.sesion == ""){
  let pass = md5 (req.body.pass)
  var sql = 'SELECT id, username, email FROM telematica4c.users WHERE email = "' + req.body.email +'" AND pass = "'
  +'"';
  + pass
  connection.query(sql, function(err, resp, fields) {
  if(resp.length) {
  req.session.userid= resp[0].id;
  req.session.username = resp[0].username;
  req.session.correo = resp[0].email;
  res.redirect('/');
  res.redirect('/404');  
  }else{
   res.redirect('/404');
  }});
  
  }else{
  res.redirect('/registro');
  }
  });
  app.get('/registro', function(req, res) {
  res.render('registro');
  });


 app.post('registroUser', function(req, res){
 let pass = "";
 if(req.body.registro == ''){
 pass = md5 (req.body.pass);

 if(req.body.username && req.body.email && req.body.pass){
     var sql = 'INSERT INTO telematica4c.users (username, email, pass) VALUES ("'+req.body.username+'","'+req.body.email+'","'+pass+'")';
     connection.query(sql, function(err, resp){
         if(resp.affectedRows !=0){
             res.redirect('/');
         }
     });
  }
  }else{
      res.redirect('/');
  }});

  app.get('/cerrar', function(req){
      req.sesion.destroy();
  });

  */
      
    app.listen(80);