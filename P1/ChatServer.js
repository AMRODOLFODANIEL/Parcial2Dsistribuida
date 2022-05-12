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
    app.listen(80);