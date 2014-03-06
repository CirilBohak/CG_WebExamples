var CollisionAlgorithm = function () {
	ICollisionAlgorithm.call( this );
};

CollisionAlgorithm.prototype = {
	constructor: CollisionAlgorithm,
	
	collisionBetween : function (item1, item2){
		Collision.collisionBetweenSelf(item1, item2, this);
	},
	
	detectCollisionBetween : function (item1, item2){
		ICollisionAlgorithm.prototype.detectCollisionBetween.call(this, item1, item2);
	},
	
	resolveCollisionBetween : function (item1, item2){
		ICollisionAlgorithm.prototype.resolveCollisionBetween.call(this, item1, item2);
	},
	
	isInstanceOf : function(obj){
		return 	obj === CollisionAlgorithm ||
				ICollisionAlgorithm.prototype.isInstanceOf.call(this, obj);
	}
}

CollisionAlgorithm.prototype.__proto__ = ICollisionAlgorithm.prototype;