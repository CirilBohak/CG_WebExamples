var IParticle = function () {
	IMovable.call( this );
	IMass.call( this );
	IParticleCollider.call( this );
};

IParticle.prototype = {
	constructor: IParticle,
	
	isInstanceOf : function(obj){
		return 	obj === IParticle ||
				IMovable.prototype.isInstanceOf.call(this, obj) ||
				IMass.prototype.isInstanceOf.call(this, obj) ||
				IParticleCollider.prototype.isInstanceOf.call(this, obj);
	}
}

IParticle.prototype.__proto__ = IMovable.prototype;
IParticle.prototype.__proto__.__proto__ = IMass.prototype;
IParticle.prototype.__proto__.__proto__.__proto__ = IParticleCollider.prototype;