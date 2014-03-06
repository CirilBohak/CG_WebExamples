var IAARectangleCollider = function () {
	IPosition.call( this );
	IRectangleSize.call( this );
};

IAARectangleCollider.prototype = {
	constructor: IAARectangleCollider,
	
	isInstanceOf : function(obj){
		return 	obj === IAARectangleCollider ||
				IPosition.prototype.isInstanceOf.call(this, obj) ||
				IRectangleSize.prototype.isInstanceOf.call(this, obj);
	}
}

IAARectangleCollider.prototype.__proto__ = IPosition.prototype;
IAARectangleCollider.prototype.__proto__.__proto__ = IRectangleSize.prototype;