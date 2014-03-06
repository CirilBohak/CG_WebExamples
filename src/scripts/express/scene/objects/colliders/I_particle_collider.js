var IParticleCollider = function () {
	IRadius.call( this );
	IPosition.call( this );
};

IParticleCollider.prototype = {
	constructor: IParticleCollider,
	
	isInstanceOf : function(obj){
		return 	obj === IParticleCollider ||
				IRadius.prototype.isInstanceOf.call(this, obj) ||
				IPosition.prototype.isInstanceOf.call(this, obj);
	}
}

IParticleCollider.prototype.__proto__ = IRadius.prototype;
IParticleCollider.prototype.__proto__.__proto__ = IPosition.prototype;