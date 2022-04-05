//server.js
'use strict'
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

      app.use(cookieParser());

      app.use(session({secret: 'keyboard cat',
                      cookie:{
                          maxAge:60000
                      }
                   }))

app.get('/', function(req, res, next){
if (req.session.views) {
req.session.views++
res.setHeader('Content-Type','text/html')
res.write('<p>views:'+ req.session.views + '</p>')
res.write('<p>expires in:' +
(req.session.cookie.maxAge / 1000) + 
        's</p>')
res.end()
} else {
    req.session.views = 1
    res.end('welcome to the session demo, refresh:')
    } 
});



app.listen(80);