var IAARectangleCollider = function () {
	IPosition.call( this );
	IRectangleSize.call( this );
};

IAARectangleCollider.prototype = {
	constructor: IAARectangleCollider,
	
	isInstanceOf : function(obj){
		return 	(obj === IAARectangleCollider ? true : false) ||
				(obj === IPosition ? true : IPosition.prototype.isInstanceOf.call(this, obj)) ||
				(obj === IRectangleSize ? true : IRectangleSize.prototype.isInstanceOf.call(this, obj));
	}
}

IAARectangleCollider.prototype.__proto__ = IPosition.prototype;
IAARectangleCollider.prototype.__proto__.__proto__ = IRectangleSize.prototype;