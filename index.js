// node server 
// 	
	var express  = require('express');
    var app      = express();                   // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    var modelAbstract=require('./model/modelAbstract');

    var User=require('./model/UserModel')(modelAbstract,mongoose,{
        text:String
    });
  

    mongoose.connect('mongodb://localhost:27017/dbGame',function(err,db){
        console.log(err,db);
    });  


    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");

      
    User.modelFunction();

    User.getAll(function(data){
        //console.log(data);
    })

    User.mongo.find(function(err,data){
        //console.log(data);
    })

    var user=new User({
        text:"Raysil"
    });

    var arrayUsers=[];
    User.getAll(function(data){
        arrayUsers=data.map(function(data){
            
            return new User(data);
        })
        arrayUsers.forEach(function(val,ind){
            console.log(val.get.text());            
        })
    });

    //user.add();
    //user.edit(obj);
    //user.delete();