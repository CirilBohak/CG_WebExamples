var Bone = function(x, y, ax, ay, rotation, length) {
	this.selected = false;
	
	this.parent = undefined;
	this.child = undefined;
	
	//Object parameters
	this.center = new Point(x, y); //Position
	this.forward = new Vector4(ax, ay, 0); //Coordinate system right or x-axis
	this.rotation = rotation; //Transformation
	
	//Global parameters
	this.direction = this.forward.clone(); //Direction
	this.global_angle = rotation;
	
	this.updateDirection();
	
	//Drawing parameters
	this.length = length == undefined ? 70 : length;
	this.r = 30;
	this.rr = 15;
	var alpha = (this.length==0)?0:(this.length<this.r)?Math.PI*0.5-Math.atan((this.r-this.rr)/this.length):Math.atan((this.r-this.rr)/this.length);
	
	
	this.angles = [	0.5*Math.PI - alpha, 1.5*Math.PI + alpha, 
					1.5*Math.PI + alpha, 2.5*Math.PI - alpha ];
	
	this.poly = [{x: this.r*Math.cos(this.angles[0]), y: this.r*Math.sin(this.angles[0])},
				 {x: this.r*Math.cos(this.angles[1]), y: this.r*Math.sin(this.angles[1])},
				 {x: this.length+this.rr*Math.cos(this.angles[2]), y: this.rr*Math.sin(this.angles[2])},
				 {x: this.length+this.rr*Math.cos(this.angles[3]), y: this.rr*Math.sin(this.angles[3])}];
};

Bone.prototype = {
	constructor: Bone,
	
	addChild : function(rotation, length){
		this.child = new Bone(this.center.x + this.direction.x * this.length,
							  this.center.y - this.direction.y * this.length,
							  this.direction.x, this.direction.y, rotation, length);
		
		this.child.parent = this;
		this.child.updateDirection();
		
		return this.child;
	},
	
	draw : function(){
		proc.strokeWeight(2);
		proc.smooth();
		
		if(this.selected){ 
			proc.fill(255,100,100,180);
			proc.stroke(255,0,0);
		}else{ 
			proc.fill(255,138,0,180);
			proc.stroke(166,89,0);
		}
		
		proc.pushMatrix();
			proc.translate(this.center.x, this.center.y);
			proc.rotate(this.global_angle);
			
			proc.beginShape();
				this.drawArc(0, 0, this.r, this.r, this.angles[0], this.angles[1]);
				this.drawArc(this.length, 0, this.rr, this.rr, this.angles[2], this.angles[3]);
			proc.endShape(proc.CLOSE);
			
			if(this.selected){
				proc.strokeWeight(1);
				var tmp = this.r*0.5;
				proc.line(tmp, 0, -tmp, 0); proc.line(0, tmp, 0, -tmp);
				
				tmp = this.rr*0.5;
				proc.line(this.length+tmp, 0, this.length-tmp, 0); proc.line(this.length, tmp, this.length, -tmp);
			}
		
		proc.popMatrix();
	},
	
	drawAll: function(){
		this.draw();
		if(this.child != undefined) this.child.drawAll();
	},
	
	drawArc : function(x,y,w,h,from,to){ //from < to
		var prec = (to-from)/Math.max(w,h); //Automatic precision calculation
		for(var i=from; i<=to; i+=prec)
			proc.vertex(x+w*Math.cos(i),y+h*Math.sin(i));
	},
	
	update : function(){ },
	
	updateDirection : function(){
		rotate2D(this.forward, -this.rotation, this.direction);
		
		if(this.parent == undefined) this.global_angle = this.rotation;
		else{
			this.global_angle = this.parent.global_angle + this.rotation;
		
			if(this.global_angle > Math.PI) this.global_angle -= 2*Math.PI;
			else if(this.global_angle < -Math.PI) this.global_angle += 2*Math.PI;
		}
		
		if(this.child != undefined){
			this.child.center.x = this.center.x + this.direction.x * this.length;
			this.child.center.y = this.center.y - this.direction.y * this.length;
			this.child.forward.x = this.direction.x; this.child.forward.y = this.direction.y;
			
			this.child.updateDirection();
		}
	},
	
	mouseOver : function(x,y){
		var tmp = {x: 0, y: 0};
		rotate2D({x: x - this.center.x , y: y - this.center.y}, -this.global_angle, tmp); //Transformed mouse
		
		if(circle_point_intersect(this.r, 0, 0, tmp)) return true;
		if(circle_point_intersect(this.rr, this.length, 0, tmp)) return true;
		return poly_point_intersect(this.poly, tmp);
	},
	
	mouseClicked: function(x,y){
		if(this.mouseOver(x,y)) this.selected = true;
		else if(this.selected) this.selected = false;
		
		return this.selected;
	},
};