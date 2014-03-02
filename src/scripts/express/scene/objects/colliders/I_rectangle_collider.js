var IRectangleCollider = function () {
	IPosition.call( this );
	IRotation.call( this );
	IRectangleSize.call( this );
};

IRectangleCollider.prototype = {
	constructor: IRectangleCollider,
	
	isInstanceOf : function(obj){
		return 	(obj === IRectangleCollider ? true : false) ||
				(obj === IPosition ? true : IPosition.prototype.isInstanceOf.call(this, obj)) ||
				(obj === IRotation ? true : IRotation.prototype.isInstanceOf.call(this, obj)) ||
				(obj === IRectangleSize ? true : IRectangleSize.prototype.isInstanceOf.call(this, obj));
	}
}

IRectangleCollider.prototype.__proto__ = IPosition.prototype;
IRectangleCollider.prototype.__proto__.__proto__ = IRotation.prototype;
IRectangleCollider.prototype.__proto__.__proto__.__proto__ = IRectangleSize.prototype;