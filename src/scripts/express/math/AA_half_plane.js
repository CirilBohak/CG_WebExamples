var AAHalfPlane = function () {
	HalfPlane.call( this );
	
	/*	0 - AxisDirectionPositiveX
		1 - AxisDirectionNegativeX
		2 - AxisDirectionPositiveY
		3 - AxisDirectionNegativeY*/
	this.direction = undefined;
};

AAHalfPlane.aaHalfPlaneWithDirection = function(direction, distance){
	return new AAHalfPlane().initWithDirection(direction, distance);
}

AAHalfPlane.prototype = {
	constructor: AAHalfPlane,
	
	initWithDirection: function(direction, distance){
		var normal = new Vector3();
		switch(direction){
			case 0: normal.set(1,0,0); break;
			case 1: normal.set(-1,0,0); break;
			case 2: normal.set(0,1,0); break;
			case 3: normal.set(0,-1,0); break;
			default: break;
		}
		
		var self = this.initWithNormal(normal, distance);
		if(self != undefined) this.direction = direction;
		
		return this;
	},
	
	setDirection: function(direction){
		switch(direction){
			case 0: this.normal.set(1,0,0); break;
			case 1: this.normal.set(-1,0,0); break;
			case 2: this.normal.set(0,1,0); break;
			case 3: this.normal.set(0,-1,0); break;
			default: break;
		}
	},
	
	setNormal: function(vector){
		if(vector.x == 0 && vector.y == 0 || vector.x != 0 && vector.y != 0){
			console.error("Axis aligned half plane requires an axis aligned normal");
		}
		
		HalfPlane.prototype.setNormal.call(this, vector);
		
		if(vector.x > 0) this.direction = 0;
		else if(vector.x < 0) this.direction = 1;
		else if(vector.y > 0) this.direction = 2;
		else if(vector.y < 0) this.direction = 3;
	},
	
	isInstanceOf : function(obj){
		return 	(obj === AAHalfPlane ? true : false) ||
				(obj === HalfPlane ? true : HalfPlane.prototype.isInstanceOf.call(this, obj));
	}
}

//Extend "AAHalfPlane.prototype"
AAHalfPlane.prototype.__proto__ = HalfPlane.prototype;