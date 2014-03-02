var Collision = function () { };

/*Collision.collisionBetween = function(item1, item2, recurse){
	var item1Particle = item1.isInstanceOf(IParticleCollider) ? item1 : false;
	var item1AARectangle = item1.isInstanceOf(IAARectangleCollider) ? item1 : false;
	
	var item2Particle = item2.isInstanceOf(IParticleCollider) ? item2 : false;
	var item2AAHalfPlane = item2.isInstanceOf(IAAHalfPlaneCollider) ? item2 : false;
	var item2AARectangle = item2.isInstanceOf(IAARectangleCollider) ? item2 : false;
	
	var item2HalfPlane = item2.isInstanceOf(IHalfPlaneCollider) ? item2 : false;
	var item2Convex = item2.isInstanceOf(IConvexCollider) ? item2 : false;
	
	if (item1Particle && item2Particle) {
		ParticleParticleCollision.collisionBetween(item1Particle, item2Particle);
		return;
	}else if(item1Particle && item2AAHalfPlane) {
		ParticleAAHalfPlaneCollision.collisionBetween(item1Particle, item2AAHalfPlane);
		return;
	}else if (item1Particle && item2AARectangle) {
		ParticleAARectangleCollision.collisionBetween(item1Particle, item2AARectangle);
		return;
	}else if (item1AARectangle && item2AAHalfPlane) {
		AARectangleAAHalfPlaneCollision.collisionBetween(item1AARectangle, item2AAHalfPlane);
		return;
	}else if (item1AARectangle && item2AARectangle) {
		AARectangleAARectangleCollision.collisionBetween(item1AARectangle, item2AARectangle);
		return;
	}else if (item1Particle && item2HalfPlane) {
		ParticleHalfPlaneCollision.collisionBetween(item1Particle, item2HalfPlane);
		return;
	}else if (item1Particle && item2Convex) {
		ParticleConvexCollision.collisionBetween(item1Particle, item2Convex);
		return;
	}
	
	if(recurse == true) this.collisionBetween(item1, item2, false);
}*/

Collision.collisionBetweenSelf = function(item1, item2, collisionAlgorithm){
	if(collisionAlgorithm.detectCollisionBetween(item1, item2)){
		if(Collision.shouldResolveCollisionBetween(item1, item2)){
			collisionAlgorithm.resolveCollisionBetween(item1, item2);
			Collision.reportCollisionBetween(item1, item2);
		}
	}
}

Collision.shouldResolveCollisionBetween = function(item1, item2){
	var customCollider1 = item1.isInstanceOf(ICustomCollider) ? item1 : false;
	var customCollider2 = item2.isInstanceOf(ICustomCollider) ? item1 : false;
	
	var result = true;
	
	if(customCollider1 && typeof customCollider1.collidingWithItem === 'function'){
		result &= customCollider1.collidingWithItem(item2);
	}
	
	if(customCollider2 && typeof customCollider2.collidingWithItem === 'function'){
		result &= customCollider2.collidingWithItem(item1);
	}
	
	return result;
}

Collision.reportCollisionBetween = function(item1, item2){
	var customCollider1 = item1.isInstanceOf(ICustomCollider) ? item1 : false;
	var customCollider2 = item2.isInstanceOf(ICustomCollider) ? item1 : false;
	
	if(customCollider1 && typeof customCollider1.collidedWithItem === 'function'){
		customCollider1.collidedWithItem(item2);
	}
	
	if(customCollider2 && typeof customCollider2.collidedWithItem === 'function'){
		customCollider2.collidedWithItem(item1);
	}
},

Collision.relaxCollisionBetween = function(item1, item2, relaxDistance){
	// We have to ask, how far we move each item. The default is each half way, but we try to take
	// the mass of the colliders into account, if items have mass.
	var relaxPercentage1 = 0.5;
	var relaxPercentage2 = 0.5;
	
	// Determine mass of the colliders. If an item has no mass it is considered static,
	// so we should move only the other one. If both have mass, we move them reciprocal to their mass.
	// So a heavier item will move a little and a lighter item more.
	var itemWithMass1 = item1.isInstanceOf(IMass) ? item1 : false;
	var itemWithMass2 = item2.isInstanceOf(IMass) ? item2 : false;
	var itemWithPosition1 = item1.isInstanceOf(IPosition) ? item1 : false;
	var itemWithPosition2 = item2.isInstanceOf(IPosition) ? item2 : false;
	
	if (itemWithMass1 && itemWithMass2) {
		var mass1 = itemWithMass1.mass;
		var mass2 = itemWithMass2.mass;
		relaxPercentage1 = mass2 / (mass1 + mass2);
		relaxPercentage2 = mass1 / (mass1 + mass2);
	} else if (itemWithMass1) {
		relaxPercentage1 = 1;
		relaxPercentage2 = 0;
	} else if (itemWithMass2) {
		relaxPercentage1 = 0;
		relaxPercentage2 = 1;
	} else {
		// No item has mass, do the same logic, but with positions.
		if (itemWithPosition1 && !itemWithPosition2) {
			relaxPercentage1 = 1;
			relaxPercentage2 = 0;
		} else if (!itemWithPosition1 && itemWithPosition2) {
			relaxPercentage1 = 0;
			relaxPercentage2 = 1;
		} 
	}
	
	// Now we need to turn the percentages into real distances.	
	
	if (itemWithPosition1) {
		itemWithPosition1.position.sub(relaxDistance.clone().multiplyScalar(relaxPercentage1));
	}
	if (itemWithPosition2) {
		itemWithPosition2.position.add(relaxDistance.clone().multiplyScalar(relaxPercentage2));
	}
}

Collision.exchangeEnergyBetween = function(item1, item2, collisionNormal, pointOfImpact){
	// We calculate exchange of energy in a collision with respect to items' momentum. Momentum is mass times
	// velocity so the items need to conform both to IMass and IVelocity. If one of the items does not, it's
	// considered as though there is a collision with a static object.
	var item1WithPosition = item1.isInstanceOf(IPosition) ? item1 : false;
	var movableItem1 = item1.isInstanceOf(IMovable) ? item1 : false;
	var rotatableItem1 = item1.isInstanceOf(IRotatable) ? item1 : false;
	
	var item2WithPosition = item2.isInstanceOf(IPosition) ? item2 : false;
	var movableItem2 = item2.isInstanceOf(IMovable) ? item2 : false;
	var rotatableItem2 = item2.isInstanceOf(IRotatable) ? item2 : false;
	
	// Velocity due to translation.
	var velocity1 = movableItem1 ? movableItem1.velocity.clone() : false; //new Vector()
	var velocity2 = movableItem2 ? movableItem2.velocity.clone() : false; //new Vector()
	
	//Velocity due to rotation.
	var lever1 = null;
	var lever2 = null;
	var tangentialDirection1 = null;
	var tangentialDirection2 = null;
	
	if (pointOfImpact) {
		if (item1WithPosition && rotatableItem1) {
			lever1 = pointOfImpact.clone().sub(item1WithPosition.position);
			tangentialDirection1 = new Vector3(-lever1.y, lever1.x, 0).normalize();
			var rotationalVelocity = tangentialDirection1.clone().multiplyScalar(lever1.length() * rotatableItem1.angularVelocity);
			velocity1.add(rotationalVelocity);
		}
		if (item2WithPosition && rotatableItem2) {
			lever2 = pointOfImpact.clone().sub(item2WithPosition.position);
			tangentialDirection2 = new Vector3(-lever2.y, lever2.x, 0).normalize();
			var rotationalVelocity = tangentialDirection2.clone().multiplyScalar(lever2.length() * rotatableItem2.angularVelocity);
			velocity2.add(rotationalVelocity);
		}
	}
	
	// ENERGY EXCHANGE

	// In a collision, energy is exchanged only along the collision normal, so we take into account only
	// the speed in the direction of the normal.
	var speed1 = velocity1 ? velocity1.dot(collisionNormal) : 0;
	var speed2 = velocity2 ? velocity2.dot(collisionNormal) : 0;
	var speedDifference = speed1 - speed2
	
	// Make sure the objects are coming towards each other. If they are coming together the collision has already been delt with.
	if (speedDifference < 0) {
		return;
	}
	
	// We can now calculate the impact impulse (the change of momentum). We take into account the cooeficient
	// of restitution which controls how elastic the collision is. We use a simplified model in which the total
	// COR is just the multiplication of coeficients of both items.
	var cor1 = item1.isInstanceOf(ICoefficientOfRestitution) ? item1.coefficientOfRestitution : 1;
	var cor2 = item2.isInstanceOf(ICoefficientOfRestitution) ? item2.coefficientOfRestitution : 1;
	var cor = cor1 * cor2;
	
	// We prepare mass inverses. If the object has no mass we consider it is static, which is the same as having
	// infinite mass. The inverse will then be zero.
	var mass1inverse = item1.isInstanceOf(IMass) ? 1.0 / item1.mass : 0;
	var mass2inverse = item2.isInstanceOf(IMass) ? 1.0 / item2.mass : 0;
	
	var item1WithAngularMass = item1.isInstanceOf(IAngularMass) ? item1 : false;
	var item2WithAngularMass = item2.isInstanceOf(IAngularMass) ? item2 : false;
	
	var angularMass1Inverse = item1WithAngularMass && tangentialDirection1 ?
		Math.pow(tangentialDirection1.clone().dot(collisionNormal) * lever1.length(), 2) / item1WithAngularMass.angularMass : 0;
	var angularMass2Inverse = item2WithAngularMass && tangentialDirection2 ?
		Math.pow(tangentialDirection2.clone().dot(collisionNormal) * lever2.length(), 2) / item2WithAngularMass.angularMass : 0;
	
	// We derive the formula for the impact as the change of momentum.
	var impact = -(cor + 1) * speedDifference / (mass1inverse + mass2inverse + angularMass1Inverse + angularMass2Inverse);
	
	// TRANSLATION CHANGE
	
	// If we divide the impact with item's mass we get the change in speed. We apply it
	// along the collisions normal. We only do this for non-static items.
	
	if (mass1inverse > 0 && movableItem1) {
		movableItem1.velocity.add(collisionNormal.clone().multiplyScalar(impact * mass1inverse));
	}
	
	if (mass2inverse > 0 && movableItem2) {
		movableItem2.velocity.sub(collisionNormal.clone().multiplyScalar(impact * mass2inverse));
	}
	
	// ROTATION CHANGE
	
	if (item1WithAngularMass && tangentialDirection1) {
		var tangentialForce = tangentialDirection1.clone().dot(collisionNormal) * impact;
		var change = tangentialForce * lever1.length() /  item1WithAngularMass.angularMass;
		rotatableItem1.angularVelocity += change;
	}
	
	if (item2WithAngularMass && tangentialDirection2) {
		var tangentialForce = tangentialDirection2.clone().dot(collisionNormal) * impact;
		var change = tangentialForce * lever2.length() /  item2WithAngularMass.angularMass;
		rotatableItem2.angularVelocity += change;
	}
}

Collision.applyFrictionOn = function(item, frictionSpeedChange, collisionTangent){

}
	
/*Collision.prototype = {
	constructor: Collision,
	
	isInstanceOf : function(obj){
		return 	obj === Collision;
	}
}*/