var ICustomCollider = function () { };

ICustomCollider.prototype = {
	constructor: ICustomCollider,
	
	collidingWithItem: function(item){ console.error("Undefined"); },
	
	collidedWithItem: function(item){ console.error("Undefined"); },

	isInstanceOf : function(obj){
		return 	obj === ICustomCollider;
	}
}

