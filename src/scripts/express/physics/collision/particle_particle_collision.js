var ParticleParticleCollision = function () {
	CollisionAlgorithm.call( this );
	
	this.name = "PPC";
};

ParticleParticleCollision.prototype = {
	constructor: ParticleParticleCollision,
	
	collisionBetween : function (particle1, particle2){
		CollisionAlgorithm.prototype.collisionBetween.call(this, particle1, particle2);
	},
	
	detectCollisionBetween : function (particle1, particle2){
		var distanceBetweenParticles = particle1.position.clone().sub(particle2.position).length();
		return distanceBetweenParticles < particle1.radius + particle2.radius;
	},
	
	resolveCollisionBetween : function (particle1, particle2){
		// RELAXATION STEP
	
		// First we relax the collision, so the two objects don't collide any more.
		// We need to calculate by how much to move them apart. We will move them in the shortest direction
		// possible which is simply the difference between both centers.
		var positionDifference = particle2.position.clone().sub(particle1.position);
		var collidedDistance = positionDifference.length();
		var minimumDistance = particle1.radius + particle2.radius;
		var relaxDistance = minimumDistance - collidedDistance;
		
		var collisionNormal = collidedDistance ? positionDifference.clone().normalize() : new Vector3(1,0,0);
		var relaxDistanceVector = collisionNormal.clone().multiplyScalar(relaxDistance);
		
		Collision.relaxCollisionBetween(particle1, particle2, relaxDistanceVector);
		
		// ENERGY EXCHANGE STEP
		
		// In a collision, energy is exchanged only along the collision normal.
		// For particles this is simply the line between both centers.
		Collision.exchangeEnergyBetween(particle1, particle2, collisionNormal, false);
	},
	
	isInstanceOf : function(obj){
		return 	obj === ParticleParticleCollision ||
				(obj === CollisionAlgorithm ? true: CollisionAlgorithm.prototype.isInstanceOf.call(this, obj));
	}
}

ParticleParticleCollision.prototype.__proto__ = CollisionAlgorithm.prototype;