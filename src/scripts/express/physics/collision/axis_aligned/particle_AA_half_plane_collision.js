var ParticleAAHalfPlaneCollision = function () {
	CollisionAlgorithm.call( this );
};

ParticleAAHalfPlaneCollision.prototype = {
	constructor: ParticleAAHalfPlaneCollision,
	
	collisionBetween : function (particle, aaHalfPlane){
		CollisionAlgorithm.prototype.collisionBetween.call(this, particle, aaHalfPlane);
	},
	
	detectCollisionBetween : function (particle, aaHalfPlane){
		switch (aaHalfPlane.aaHalfPlane.direction) {
			case 0: //AxisDirectionPositiveX
				return particle.position.x - particle.radius < aaHalfPlane.aaHalfPlane.distance;
			case 1: //AxisDirectionNegativeX
				return particle.position.x + particle.radius > -aaHalfPlane.aaHalfPlane.distance;
			case 2: //AxisDirectionPositiveY
				return particle.position.y - particle.radius < aaHalfPlane.aaHalfPlane.distance;
			case 3: //AxisDirectionNegativeY
				return particle.position.y + particle.radius > -aaHalfPlane.aaHalfPlane.distance;
			default:
				return false;
		}
	},
	
	resolveCollisionBetween : function (particle, aaHalfPlane){
		// RELAXATION STEP
	
		// First we relax the collision, so the two objects don't collide any more.
		var relaxDistance = new Vector3();
		var pointOfImpact = new Vector3();
		
		switch (aaHalfPlane.aaHalfPlane.direction) {
			case 0: //AxisDirectionPositiveX
				relaxDistance.set(particle.position.x - particle.radius - aaHalfPlane.aaHalfPlane.distance, 0, 0);
				pointOfImpact.set(aaHalfPlane.aaHalfPlane.distance, particle.position.y, 0);
				break;
			case 1: //AxisDirectionNegativeX
				relaxDistance.set(particle.position.x + particle.radius + aaHalfPlane.aaHalfPlane.distance, 0, 0);
				pointOfImpact.set(-aaHalfPlane.aaHalfPlane.distance, particle.position.y, 0);
				break;
			case 2: //AxisDirectionPositiveY
				relaxDistance.set(0, particle.position.y - particle.radius - aaHalfPlane.aaHalfPlane.distance, 0);
				pointOfImpact.set(particle.position.x, aaHalfPlane.aaHalfPlane.distance, 0);
				break;
			case 3: //AxisDirectionNegativeY
				relaxDistance.set(0, particle.position.y + particle.radius + aaHalfPlane.aaHalfPlane.distance, 0);
				pointOfImpact.set(particle.position.x, -aaHalfPlane.aaHalfPlane.distance, 0);
				break;
		}
		
		Collision.relaxCollisionBetween(particle, aaHalfPlane, relaxDistance);
		
		// ENERGY EXCHANGE STEP
		
		// In a collision, energy is exchanged only along the collision normal.
		// For particles this is simply the line between both centers.
		var collisionNormal = relaxDistance.clone().normalize();
		
		Collision.exchangeEnergyBetween(particle, aaHalfPlane, collisionNormal, pointOfImpact);
	},
	
	isInstanceOf : function(obj){
		return 	obj === ParticleAAHalfPlaneCollision ||
				CollisionAlgorithm.prototype.isInstanceOf.call(this, obj);
	}
}

ParticleAAHalfPlaneCollision.prototype.__proto__ = CollisionAlgorithm.prototype;