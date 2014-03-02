var IParticle = function () {
	IMovable.call( this );
	IMass.call( this );
	IParticleCollider.call( this );
};

IParticle.prototype = {
	constructor: IParticle,
	
	isInstanceOf : function(obj){
		return 	(obj === IParticle ? true : false) ||
				(obj === IMovable ? true : IMovable.prototype.isInstanceOf.call(this, obj)) ||
				(obj === IMass ? true : IMass.prototype.isInstanceOf.call(this, obj)) ||
				(obj === IParticleCollider ? true : IParticleCollider.prototype.isInstanceOf.call(this, obj));
	}
}

IParticle.prototype.__proto__ = IMovable.prototype;
IParticle.prototype.__proto__.__proto__ = IMass.prototype;
IParticle.prototype.__proto__.__proto__.__proto__ = IParticleCollider.prototype;