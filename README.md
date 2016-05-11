# serverAbstract

ModelAbract is a librery for create models Dynamically 

with Mongo DB  

Require Mongoose

```javascript
 var mongoose = require('mongoose');   
 
 var modelAbsctract = require('./model/modelAbstract');
 
 var User=require('./model/UserModel')(modelAbstract,mongoose,{
        text:String
    });
  

    mongoose.connect('mongodb://localhost:27017/dbGame',function(err,db){
        console.log(err,db);
    });  
    User.modelFunction(); // 

    User.getAll(function(data){
        //console.log(data);
    })

    User.mongo.find(function(err,data){
        //console.log(data);
    })

    var arrayUsers=[];
    User.getAll(function(data){
        arrayUsers=data.map(function(data){
            
            return new User(data);
        })
        arrayUsers.forEach(function(val,ind){
            console.log(val.get.text());            
        })
    });
    var user=new User({
        text:"Adrian"
    });
    
    user.add();
    user.edit(obj);
    user.delete();
```

Instance UserModel...

```javascript

    
var model=function(modelAbstract,mongo,obj){

	var Users=new modelAbstract('users',obj,mongo);

	Users.modelFunction=function(){
		console.log('Prototipando la function');
	}

	return Users
}

module.exports=model;
```

    
