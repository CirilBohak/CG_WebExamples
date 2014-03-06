var AARectangleAARectangleCollision = function () {
	CollisionAlgorithm.call( this );
};

AARectangleAARectangleCollision.prototype = {
	constructor: AARectangleAARectangleCollision,
	
	collisionBetween : function (aaRectangle1, aaRectangle2){
		CollisionAlgorithm.prototype.collisionBetween.call(this, aaRectangle1, aaRectangle2);
	},
	
	detectCollisionBetween : function (aaRectangle1, aaRectangle2){
		var horizontalDistancle = Math.abs(aaRectangle1.position.x-aaRectangle2.position.x);
		var verticalDistancle = Math.abs(aaRectangle1.position.y-aaRectangle2.position.y);
		
		return horizontalDistancle < aaRectangle1.width/2 + aaRectangle2.width/2 && verticalDistancle < aaRectangle1.height/2 + aaRectangle2.height/2;
	},
	
	resolveCollisionBetween : function (aaRectangle1, aaRectangle2){
		// RELAXATION STEP
		
		// First we relax the collision, so the two objects don't collide any more.
		// We need to calculate by how much to move them apart. We will move them in the shortest direction
		// possible which could be either horizontal or vertical.
		var horizontalDifference = aaRectangle1.position.x-aaRectangle2.position.x;
		var horizontalCollidedDistance = Math.abs(horizontalDifference);
		var horizontalMinimumDistance = aaRectangle1.width/2 + aaRectangle2.width/2;
		var horizontalRelaxDistance = horizontalMinimumDistance - horizontalCollidedDistance;
		
		var verticalDifference = aaRectangle1.position.y-aaRectangle2.position.y;
		var verticalCollidedDistance = Math.abs(verticalDifference);
		var verticalMinimumDistance = aaRectangle1.height/2 + aaRectangle2.height/2;
		var verticalRelaxDistance = verticalMinimumDistance - verticalCollidedDistance;
		
		var collisionNormal = new Vector3();
		var relaxDistance = 0.0;
		
		if (horizontalRelaxDistance < verticalRelaxDistance) {
			relaxDistance = horizontalRelaxDistance;
			collisionNormal.set(verticalDifference < 0 ? 1 : -1, 0, 0);
		} else {
			relaxDistance = verticalRelaxDistance;
			collisionNormal.set(0, verticalDifference < 0 ? 1 : -1, 0);
		}
		
		var relaxDistanceVector = collisionNormal.clone().multiplyScalar(relaxDistance);
		
		Collision.relaxCollisionBetween(aaRectangle1, aaRectangle2, relaxDistanceVector);
		
		// ENERGY EXCHANGE STEP
		
		// In a collision, energy is exchanged only along the collision normal.
		// For particles this is simply the line between both centers.
		Collision.exchangeEnergyBetween(aaRectangle1, aaRectangle2, collisionNormal, false);
	},
	
	isInstanceOf : function(obj){
		return 	obj === AARectangleAARectangleCollision ||
				CollisionAlgorithm.prototype.isInstanceOf.call(this, obj);
	}
}

AARectangleAARectangleCollision.prototype.__proto__ = CollisionAlgorithm.prototype;