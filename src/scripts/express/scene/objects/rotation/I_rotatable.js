var IRotatable = function () {
	IRotation.call( this );
	IAngularVelocity.call( this );
};

IRotatable.prototype = {
	constructor: IRotatable,
	
	isInstanceOf : function(obj){
		return 	(obj === IRotatable ? true : false) ||
				(obj === IRotation ? true : IRotation.prototype.isInstanceOf.call(this, obj)) ||
				(obj === IAngularVelocity ? true : IAngularVelocity.prototype.isInstanceOf.call(this, obj));
	}
}

IRotatable.prototype.__proto__ = IRotation.prototype;
IRotatable.prototype.__proto__.__proto__ = IAngularVelocity.prototype;