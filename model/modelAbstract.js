var modelAbstract=function(){
	return function(objAbstract){
		

		this.schema=objAbstract;

		var arrayFn=Object.getOwnPropertyNames(objAbstract);

		this.get=generateGet.bind(this)();
				

		function generateGet(){
			var obj={};
			arrayFn.forEach(function(val, ind){								
				obj[val]=function(){										
					return this.schema[val];
				}.bind(this);
			}.bind(this));
			return obj;
		};
	}
}


var users=new modelAbstract();

var user = new users(
		{
			id:1,
			nombre:"Adrian"
		}
	);

console.log(user);
console.log('****************');
console.log(user.get.id());
console.log('****************');
console.log(user.get.nombre());
