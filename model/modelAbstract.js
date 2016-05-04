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

	model.args={
		name:classModel,
		objType:objType,
		mongo:mongooseModel
	};

	model.mongo=modelMongo;

	model.getAll=function(fn){
		model.mongo.find(function(err,data){
			if(!err){
				if(typeof fn ==="function"){
					fn(data);
				}				
			}
		});		
	}
	return model;
}

module.exports=modelAbstract;