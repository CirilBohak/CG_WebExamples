var IAARectangle = function () {
	IMovable.call( this );
	IMass.call( this );
	IAARectangleCollider.call( this );
};

IAARectangle.prototype = {
	constructor: IAARectangle,
	
	isInstanceOf : function(obj){
		return 	(obj === IAARectangle ? true : false) ||
				(obj === IMovable ? true : IMovable.prototype.isInstanceOf.call(this, obj)) ||
				(obj === IMass ? true : IMass.prototype.isInstanceOf.call(this, obj)) ||
				(obj === IAARectangleCollider ? true : IAARectangleCollider.prototype.isInstanceOf.call(this, obj));
	}
}

IAARectangle.prototype.__proto__ = IMovable.prototype;
IAARectangle.prototype.__proto__.__proto__ = IMass.prototype;
IAARectangle.prototype.__proto__.__proto__.__proto__ = IAARectangleCollider.prototype;
