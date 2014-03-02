var MovementPhysics = function () { };

MovementPhysics.simulateMovementOn = function(item, elapsed){
	var movable = item.isInstanceOf(IMovable) ? item : false;
	var rotatable = item.isInstanceOf(IMovable) ? item : false;
	
	if(movable) movable.position.add(movable.velocity.clone().multiplyScalar(elapsed));
	
	if(rotatable) rotatable.rotationAngle += rotatable.angularVelocity * elapsed;
};