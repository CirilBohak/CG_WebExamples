var ICircle = function () {
	IParticle.call( this );
	IRotatable.call( this );
	IAngularMass.call( this );
};

ICircle.prototype = {
	constructor: ICircle,
	
	isInstanceOf : function(obj){
		return 	obj === ICircle ||
				IParticle.prototype.isInstanceOf.call(this, obj) ||
				IRotatable.prototype.isInstanceOf.call(this, obj) ||
				IAngularMass.prototype.isInstanceOf.call(this, obj);
	}
}

ICircle.prototype.__proto__ = IParticle.prototype;
ICircle.prototype.__proto__.__proto__ = IRotatable.prototype;
ICircle.prototype.__proto__.__proto__.__proto__ = IAngularMass.prototype;