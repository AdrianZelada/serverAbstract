function modelAbstract(classModel,objType,mongooseModel){

	var modelMongo= mongooseModel.model(classModel,objType);

	var model= function(objAbstract){
		var schema=objAbstract;
		var arrayFn=Object.getOwnPropertyNames(objAbstract);

		this.get=generateGet.bind(this)();
	
		this.set=generateSet.bind(this)();

		this.add=function(fn){			
			modelMongo.create(schema,function(err,tod){				
				schema._id=tod._id;
				fn(err,tod);
			});
		}
		this.edit=function(fn){
			console.log(schema);
			modelMongo.findById(schema._id,function(err,item){				
				for(var ind in schema){
					item[ind]=schema[ind];
				}
				item.save(function(e,t){
					if(typeof fn ==="function"){
						fn(e,t);	
					}					
				});
			})
			//modelMongo.update({_id:schema._id},{$set:{}})


		}

		function generateGet(){
			var obj={};
			arrayFn.forEach(function(val, ind){								
				obj[val]=function(){										
					return schema[val];
				}.bind(this);
			}.bind(this));
			return obj;
		};

		function generateSet(){
			var obj={};
			arrayFn.forEach(function(val, ind){								
				obj[val]=function(value){										
					schema[val]=value;
				}.bind(this);
			}.bind(this));
			return obj;
		}		
	}
	model.getAll=function(){
		console.log("asdasxxxxxxxxxa");
	}
	return model;
}

module.exports=modelAbstract;

/*modelAbstract.prototype={
		getAll:function(){
			console.log("asdasd");
		},
		setAll:function(){
			console.log("asdasxxxxxxd");	
		}
	}
/*modelAbstract.prototype.getAll=function(){
	console.log("asdasd");
}*/
//modelAbstract.prototype.getAll();
/*var users=new modelAbstract();
console.log(users);

users.getAll()

//console.log(users.getAll());
var user = new users(
		{
			id:1,
			nombre:"Adrian"
		}
	);
*/
/*
var users=new modelAbstract();

var user = new users(
		{
			id:1,
			nombre:"Adrian"
		}
	);

var user2=new users(
{
	id:21,
	nombre:"walter"
})

console.log(user);
console.log('****************');
console.log(user.get.id());
console.log('****************');
console.log(user.get.nombre());
console.log('****************');
console.log('****************');
user.set.id(2);
console.log('****************');
user.set.nombre("Pedro");
console.log('****************');
console.log(user.get.id());
console.log(user.get.nombre());
console.log('****************');
console.log(user2.get.id())
console.log(user2.get.nombre())*/

