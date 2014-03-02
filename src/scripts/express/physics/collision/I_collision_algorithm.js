var ICollisionAlgorithm = function () { };

ICollisionAlgorithm.prototype = {
	constructor: ICollisionAlgorithm,
	
	collisionBetween : function (item1, item2){ console.error("Undefined"); },
	
	detectCollisionBetween : function (item1, item2){ console.error("Undefined"); },
	
	resolveCollisionBetween : function (item1, item2){ console.error("Undefined"); },

	isInstanceOf : function(obj){
		return 	(obj === ICollisionAlgorithm ? true : false);
	}
}