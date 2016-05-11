
var model=function(modelAbstract,mongo,obj){

	var Users=new modelAbstract('users',obj,mongo);

	Users.modelFunction=function(){
		console.log('Prototipando la function');
	}

	return Users
}

module.exports=model;