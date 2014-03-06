var ParticleAARectangleCollision = function () {
	CollisionAlgorithm.call( this );
};

ParticleAARectangleCollision.prototype = {
	constructor: ParticleAARectangleCollision,
	
	collisionBetween : function (particle, aaRectangle){
		CollisionAlgorithm.prototype.collisionBetween.call(this, particle, aaRectangle);
	},
	
	detectCollisionBetween : function (particle, aaRectangle){
		var relaxDistance = this.calculateRelaxDistanceBetween(particle, aaRectangle);
		return relaxDistance.lengthSqrt() > 0;
	},
	
	resolveCollisionBetween : function (particle, aaRectangle){
		var relaxDistance = this.calculateRelaxDistanceBetween(particle, aaRectangle);
		Collision.relaxCollisionBetween(particle, aaRectangle, relaxDistance);
		
		var collisionNormal = relaxDistance.clone().normalize();
		Collision.exchangeEnergyBetween(particle, aaRectangle, collisionNormal, false);
	},
	
	calculateRelaxDistanceBetween: function(particle, aaRectangle){
		var relaxDistance = new Vector3();
		var nearestVertex = aaRectangle.position.clone();
		
		var halfWidth = aaRectangle.width / 2;
		var halfHeight = aaRectangle.height / 2;
		
		// Calculate overlap with all sides.
		var leftDifference = (aaRectangle.position.x - halfWidth) - (particle.position.x + particle.radius);
		if (leftDifference > 0) return relaxDistance;
		
		var rightDifference = (particle.position.x - particle.radius) - (aaRectangle.position.x + halfWidth);
		if (rightDifference > 0) return relaxDistance;
		
		var topDifference = (aaRectangle.position.y - halfHeight) - (particle.position.y + particle.radius);
		if (topDifference > 0) return relaxDistance;
		
		var bottomDifference = (particle.position.y - particle.radius) - (aaRectangle.position.y + halfHeight);
		if (bottomDifference > 0) return relaxDistance;
		
		// Particle is under all sides.
		// Find the voronoi region's nearest vertex.
		var horizontalyInside = false;
		var verticalyInside = false;
		
		if (particle.position.x < aaRectangle.position.x - halfWidth) nearestVertex.x -= halfWidth;
		else if (particle.position.x > aaRectangle.position.x + halfWidth) nearestVertex.x += halfWidth;
		else horizontalyInside = true;
		
		if (particle.position.y < aaRectangle.position.y - halfHeight) nearestVertex.y -= halfHeight;
		else if (particle.position.y > aaRectangle.position.y + halfHeight) nearestVertex.y += halfHeight;
		else verticalyInside = true;
		
		if (!horizontalyInside && !verticalyInside) {
			// We have a possible collision with an edge vertex.
			var particleVertex = nearestVertex.clone().sub(particle.position);
			var vertexDistance = particleVertex.length();
			
			if (vertexDistance > particle.radius) return relaxDistance;
			else return particleVertex.normalize().multiplyScalar(particle.radius - vertexDistance);
		}
		
		// Find the smallest difference per axis.
		if (leftDifference > rightDifference) relaxDistance.x = -leftDifference;
		else relaxDistance.x = rightDifference;
		
		if (topDifference > bottomDifference) relaxDistance.y = -topDifference;
		else relaxDistance.y = bottomDifference;
		
		// Find the smallest difference between axises;
		if (Math.abs(relaxDistance.x) < Math.abs(relaxDistance.y)) relaxDistance.y = 0;
		else relaxDistance.x = 0;
		
		return relaxDistance;
	},
	
	isInstanceOf : function(obj){
		return 	obj === ParticleAARectangleCollision ||
				CollisionAlgorithm.prototype.isInstanceOf.call(this, obj);
	}
}

ParticleAARectangleCollision.prototype.__proto__ = CollisionAlgorithm.prototype;