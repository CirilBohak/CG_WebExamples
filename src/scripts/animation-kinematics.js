enabledAddingPoints = false;
var drawGuide = false, drawGuideLines = false;
unit = 70;

var guideColor = new Color(100, 100, 100);

function gridToCanvasTransform(point){ return point; }

var TWO_PI = 2*Math.PI;

var Bone = function(x, y, ax, ay, angle) {
	this.selected = false;
	
	this.parent = undefined;
	this.child = undefined;
	
	//Object parameters
	this.right = new Vector3(ax, ay, 0); //Coordinate system right or x-axis
	
	this.direction = this.right.clone(); //Direction
	this.center = new Point(x, y); //Position
	
	this.angle = angle;
	this.global_angle = angle;
	this.fixRight();
	
	//Drawing parameters
	this.length = 70;
	this.r = this.length*0.4;
	this.rr = this.r*0.4;
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
	},

	addChild : function(angle){
		this.child = new Bone(this.center.x + this.direction.x * this.length,
							  this.center.y - this.direction.y * this.length,
							  this.direction.x, this.direction.y, angle);
		
		this.child.parent = this;
		this.child.fixRight();
		
		return this.child;
	},
	
	update : function(){
		this.angle += 0.01;
		if(this.angle > TWO_PI) this.angle = 0;
		this.fixRight();
	},
	
	drawArc : function(x,y,w,h,from,to){ //from < to
		var prec = (to-from)/Math.max(w,h); //Automatic precision calculation
		for(var i=from; i<=to; i+=prec)
			proc.vertex(x+w*Math.cos(i),y+h*Math.sin(i));
	},
	
	fixRight : function(){
		this.rotation(-this.angle, this.direction, this.right.x, this.right.y);
		
		if(this.parent == undefined) this.global_angle = this.angle;
		else{ 
			this.global_angle = this.parent.global_angle + this.angle;
		
			if(this.global_angle>TWO_PI) this.global_angle-=TWO_PI;
			else if(this.global_angle<TWO_PI) this.global_angle+=TWO_PI;
		}
		
		if(this.child != undefined){
			this.child.center.x = this.center.x + this.direction.x * this.length;
			this.child.center.y = this.center.y - this.direction.y * this.length;
			this.child.right.x = this.direction.x; this.child.right.y = this.direction.y;
			
			this.child.fixRight();
		}
	},
	
	mouseOver : function(x,y){
		var tmp = {x: 0, y: 0};
		this.rotation(-this.global_angle, tmp, x - this.center.x , y - this.center.y ); //Transformed mouse
		
		if(this.point_circle_intersect(this.r, 0, 0, tmp.x, tmp.y)) return true;
		if(this.point_circle_intersect(this.rr, this.length, 0, tmp.x, tmp.y)) return true;
		return this.point_poly_intersect(this.poly, tmp.x, tmp.y);
	},
	
	mouseClicked: function(x,y){
		if(this.mouseOver(x,y)) this.selected = true;
		else if(this.selected) this.selected = false;
		
		return this.selected;
	},
	
	//Intersections
	point_poly_intersect : function(vertxes, x, y){
		var nvert = vertxes.length, i = 0, j = nvert-1, c = false;
		for (; i < nvert; j = i++) {
			if ( ((vertxes[i].y>y) != (vertxes[j].y>y)) && (x < (vertxes[j].x-vertxes[i].x) * (y-vertxes[i].y) / (vertxes[j].y-vertxes[i].y) + vertxes[i].x) ) c = !c;
		}
		return c;
	},
	
	point_circle_intersect : function(r, cx, cy, x, y){
		return (Math.pow(x - cx,2) + Math.pow(y - cy,2)) < (r*r);
	},
	
	//2D vector rotation
	rotation : function(theta, from_xy, x, y){
		from_xy.x = x*Math.cos(theta) - y*Math.sin(theta);
		from_xy.y = x*Math.sin(theta) + y*Math.cos(theta);
	}
};

var root = new Bone(400, 300, 1, 0, Math.PI*0.25); //Root node
var last = root.addChild(0)
			   .addChild(0)
			   .addChild(0);
root.selected = true;
			   
var selected = root;
			   
function exampleInit() {
	proc.translate(0,0);
}

function draw() {
    // clear background
    proc.background(255);
	
	//Draw
	for(var bone = root; bone != undefined; bone = bone.child){
		proc.pushMatrix();
			proc.translate(bone.center.x,bone.center.y);
			proc.rotate(bone.global_angle);
			bone.draw();
		proc.popMatrix();
	}
	
	//Update only selected and it's children
	if(selected.selected){
		selected.update();
		
		//Show guides
		var tmp = selected.length + 20;
		drawLine(selected.center, selected.direction.clone().multiplyScalar(tmp), 1, guideColor);
		drawLine(selected.center, selected.right.clone().multiplyScalar(tmp), 1, guideColor);
		drawAngleArc(selected.center, selected.right, selected.center, selected.direction, 1, 120, guideColor, selected.angle);
	}
}

function mouseMoved() { }

function mouseClicked() {
	var tmp = last;
	do{
		if(tmp.mouseClicked(proc.mouseX, proc.mouseY)){
			if(tmp!=selected) selected.selected = false;
			selected = tmp;
			break;
		}else tmp = tmp.parent;
	}while(tmp!=undefined);
}