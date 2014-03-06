var IMovable = function () {
	IPosition.call( this );
	IVelocity.call( this );
};

IMovable.prototype = {
	constructor: IMovable,
	
	isInstanceOf : function(obj){
		return 	obj === IMovable ||
				IPosition.prototype.isInstanceOf.call(this, obj) ||
				IVelocity.prototype.isInstanceOf.call(this, obj);
	}
}

IMovable.prototype.__proto__ = IPosition.prototype;
IMovable.prototype.__proto__.__proto__ = IVelocity.prototype;