var AARectangleAAHalfPlaneCollision = function () {
	CollisionAlgorithm.call( this );
};

AARectangleAAHalfPlaneCollision.prototype = {
	constructor: AARectangleAAHalfPlaneCollision,
	
	collisionBetween : function (aaRectangle, aaHalfPlane){
		CollisionAlgorithm.prototype.collisionBetween.call(this, aaRectangle, aaHalfPlane);
	},
	
	detectCollisionBetween : function (aaRectangle, aaHalfPlane){
		switch (aaHalfPlane.aaHalfPlane.direction) {
			case 0: //AxisDirectionPositiveX
				return aaRectangle.position.x - aaRectangle.width/2 < aaHalfPlane.aaHalfPlane.distance;
			case 1: //AxisDirectionNegativeX
				return aaRectangle.position.x + aaRectangle.width/2 > -aaHalfPlane.aaHalfPlane.distance;
			case 2: //AxisDirectionPositiveY
				return aaRectangle.position.y - aaRectangle.height/2 < aaHalfPlane.aaHalfPlane.distance;
			case 3: //AxisDirectionNegativeY
				return aaRectangle.position.y + aaRectangle.height/2 > -aaHalfPlane.aaHalfPlane.distance;
			default:
				return false;
		}
	},
	
	resolveCollisionBetween : function (aaRectangle, aaHalfPlane){
		// RELAXATION STEP
		
		// First we relax the collision, so the two objects don't collide any more.
		var relaxDistance = new Vector3();
		
		switch (aaHalfPlane.aaHalfPlane.direction) {
			case AxisDirectionPositiveX:
				relaxDistance.set(aaRectangle.position.x - aaRectangle.width/2 - aaHalfPlane.aaHalfPlane.distance, 0, 0);
				break;
			case AxisDirectionNegativeX:
				relaxDistance.set(aaRectangle.position.x + aaRectangle.width/2 + aaHalfPlane.aaHalfPlane.distance, 0, 0);
				break;
			case AxisDirectionPositiveY:
				relaxDistance.set(0, aaRectangle.position.y - aaRectangle.height/2 - aaHalfPlane.aaHalfPlane.distance, 0);
				break;
			case AxisDirectionNegativeY:
				relaxDistance.set(0, aaRectangle.position.y + aaRectangle.height/2 + aaHalfPlane.aaHalfPlane.distance, 0);
				break;
		}
		
		Collision.relaxCollisionBetween(aaRectangle, aaHalfPlane, relaxDistance);
		
		// ENERGY EXCHANGE STEP
		
		// In a collision, energy is exchanged only along the collision normal.
		// For particles this is simply the line between both centers.
		var collisionNormal = relaxDistance.clone().normalize();
		
		Collision.exchangeEnergyBetween(aaRectangle, aaHalfPlane, collisionNormal, false);
	},
	
	isInstanceOf : function(obj){
		return 	obj === AARectangleAAHalfPlaneCollision ||
				CollisionAlgorithm.prototype.isInstanceOf.call(this, obj);
	}
}

AARectangleAAHalfPlaneCollision.prototype.__proto__ = CollisionAlgorithm.prototype;