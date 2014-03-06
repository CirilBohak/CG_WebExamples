var Obsticle = function () {
	IConvexCollider.call( this );
	IPosition.call( this );
	IRotatable.call( this );
	IAngularMass.call( this );
};

Obsticle.prototype = {
	constructor: Obsticle,
	
	isInstanceOf : function(obj){
		return 	obj === Obsticle ||
				IConvexCollider.prototype.isInstanceOf.call(this, obj) ||
				IPosition.prototype.isInstanceOf.call(this, obj) ||
				IRotatable.prototype.isInstanceOf.call(this, obj) ||
				IAngularMass.prototype.isInstanceOf.call(this, obj);
	}
}

Obsticle.prototype.__proto__ = IConvexCollider.prototype;
Obsticle.prototype.__proto__.__proto__ = IPosition.prototype;
Obsticle.prototype.__proto__.__proto__.__proto__ = IRotatable.prototype;
Obsticle.prototype.__proto__.__proto__.__proto__.__proto__ = IAngularMass.prototype;