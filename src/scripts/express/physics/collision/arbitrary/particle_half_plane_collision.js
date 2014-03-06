var ParticleHalfPlaneCollision = function () {
	CollisionAlgorithm.call( this );
};

ParticleHalfPlaneCollision.prototype = {
	constructor: ParticleHalfPlaneCollision,
	
	collisionBetween : function (particle, halfPlane){
		CollisionAlgorithm.prototype.collisionBetween.call(this, particle, halfPlane);
	},
	
	detectCollisionBetween : function (particle, halfPlane){
		var nearPoint = particle.position.clone().dot(halfPlane.halfPlane.normal) - particle.radius;
		return nearPoint < halfPlane.halfPlane.distance;
	},
	
	resolveCollisionBetween : function (particle, halfPlane){
		// RELAXATION STEP
	
		// First we relax the collision, so the two objects don't collide any more.
		var nearPoint = particle.position.clone().dot(halfPlane.halfPlane.normal) - particle.radius;
		var relaxDistance = nearPoint - halfPlane.halfPlane.distance;
		var relaxDistanceVector = halfPlane.halfPlane.normal.clone().multiplyScalar(relaxDistance);
		
		Collision.relaxCollisionBetween(particle, halfPlane, relaxDistanceVector);
		
		// ENERGY EXCHANGE STEP
	
		// In a collision, energy is exchanged only along the collision normal.
		// For particles this is simply the line between both centers.
		var collisionNormal = relaxDistanceVector.clone().normalize();
		var pointOfImpact = particle.position.clone().add(collisionNormal.clone().multiplyScalar(relaxDistance + particle.radius));
		
		Collision.exchangeEnergyBetween(particle, halfPlane, collisionNormal, pointOfImpact);
	},
	
	isInstanceOf : function(obj){
		return 	obj === ParticleHalfPlaneCollision ||
				CollisionAlgorithm.prototype.isInstanceOf.call(this, obj);
	}
}

ParticleHalfPlaneCollision.prototype.__proto__ = CollisionAlgorithm.prototype;