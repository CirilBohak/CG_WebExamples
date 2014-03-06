var ParticleConvexCollision = function () {
	CollisionAlgorithm.call( this );
};
	
ParticleConvexCollision.prototype = {
	constructor: ParticleConvexCollision,
	
	collisionBetween : function (particle, convex){
		CollisionAlgorithm.prototype.collisionBetween.call(this, particle, convex);
	},
	
	detectCollisionBetween : function (particle, convex){
		var relaxDistance = this.calculateRelaxDistanceBetween(particle, convex, false);
		if(relaxDistance.lengthSqrt() > 0) console.log("coll");
		return relaxDistance.lengthSqrt() > 0;
	},
	
	resolveCollisionBetween : function (particle, convex){
		var pointOfImpact = new Vector3();
		var relaxDistance = this.calculateRelaxDistanceBetween(particle, convex, pointOfImpact);
		
		Collision.relaxCollisionBetween(particle, convex, relaxDistance);
		
		var collisionNormal = relaxDistance.clone().normalize();
		
		Collision.exchangeEnergyBetween(particle, convex, collisionNormal, pointOfImpact);
	},
	
	calculateRelaxDistanceBetween : function(particle, convex, pointOfImpact){
		// First move particle in coordinate space of the convex.
		var offset = convex.isInstanceOf(IPosition) ? convex.position : new Vector3();
		var angle = convex.isInstanceOf(IRotation) ? convex.rotationAngle : 0.0;
		var transform = new Matrix4().makeTranslation(offset.x, offset.y, 0).multiply(new Matrix4().makeRotationZ(angle));
		var relativeParticlePosition = particle.position.clone().applyMatrix(transform.clone().inverse());
		
		var vertices = convex.bounds.verteces;
		var halfPlanes = convex.bounds.halfPlanes;
		
		var voronoiNearEdge = false;
		
		var smallestDifference = 0.0;
		var smallestDifferenceIndex = 0;
		
		var smallestDistance = 0.0;
		var smallestDistanceIndex = 0;
		
		// Calculate overlap with all sides.
		var timesCenterUnderEdge = 0;
		for (var i = 0; i < vertices.length; i++) {
			
			// Relax distance from the plane
			var halfPlane = halfPlanes[i];
			
			var nearPoint = relativeParticlePosition.clone().dot(halfPlane.normal) - particle.radius;
			var relaxDifference = nearPoint - halfPlane.distance;
			if (relaxDifference > 0) return new Vector3();
			
			if (i == 0 || relaxDifference > smallestDifference) {
				smallestDifference = relaxDifference;
				smallestDifferenceIndex = i;
			}
			
			// Distance to vertex
			var distance = vertices[i].clone().sub(relativeParticlePosition).length();
			if (i == 0 || distance < smallestDistance) {
				smallestDistance = distance;
				smallestDistanceIndex = i;
			}
			
			// Are we in the voronoi region of this edge?
			var centerDifference = relativeParticlePosition.clone().dot(halfPlane.normal) - halfPlane.distance;
			if (centerDifference > 0) {
				// Center is above edge so see if we're between start and end.
				var edge = convex.bounds.edges[i];
				var edgeNormal = edge.clone().normalize();
				var start = vertices[i].clone().dot(edgeNormal);
				var end = edge.clone().add(vertices[i]).dot(edgeNormal);
				var center = relativeParticlePosition.clone().dot(edgeNormal);
				
				if (start < center && center < end) {
					voronoiNearEdge = true;
					
					if (smallestDifferenceIndex == i && pointOfImpact) {
						pointOfImpact.setVector(vertices[i].clone().add(edge.clone().multiplyScalar((center-start)/(end-start))));
					}
				}
			}else timesCenterUnderEdge++;
		}
		
		var relaxDistance = new Vector3();
		
		// Particle is under all sides.	
		if (voronoiNearEdge || timesCenterUnderEdge == vertices.length) {
			// The edge is closer than the nearest vertex, so just relax in the direction of edge normal
			var nearestPlane = halfPlanes[smallestDifferenceIndex];
			relaxDistance.setVector(nearestPlane.normal).multiplyScalar(smallestDifference);
		}else{
			// We are in the voronoi region next to nearest vertex.
			var voronoiVertex = vertices[smallestDistanceIndex];
			var voronoiNormal = relativeParticlePosition.clone().sub(voronoiVertex).normalize();
			
			var nearPoint = relativeParticlePosition.clone().dot(voronoiNormal) - particle.radius;
			var distance = voronoiVertex.clone().dot(voronoiNormal);
			var relaxDifference = nearPoint - distance;
			
			if (relaxDifference > 0) return new Vector3();
			
			// Relax in the direction of voronoi vertex
			relaxDistance.setVector(voronoiNormal).multiplyScalar(relaxDifference);
			if(pointOfImpact) pointOfImpact.setVector(voronoiVertex);
		}
		
		// Transform result vector back into absolute space.
		if(pointOfImpact) pointOfImpact.applyMatrix(transform);
		return relaxDistance.transformDirection(transform);
	},
	
	isInstanceOf : function(obj){
		return 	obj === ParticleConvexCollision ||
				CollisionAlgorithm.prototype.isInstanceOf.call(this, obj);
	}
}

ParticleConvexCollision.prototype.__proto__ = CollisionAlgorithm.prototype;