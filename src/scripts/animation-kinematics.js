enabledAddingPoints = false;
var drawGuide = false, drawGuideLines = false;

function exampleInit() {
	proc.scale(1,-1);
	proc.translate(1,-proc.height);
	
	loop();
}

function loop(){
	update();
	
	draw();
	
	requestAnimationFrame(loop);
}

var r = 50,
	rr = 20,
	l = 200;
var alpha = Math.atan((r-rr)/l),
	angle = 0;

function drawArc(x,y,w,h,from,to){ //from < to
	var prec = 2*(to-from)/Math.max(w,h); //Automatic precision calculation
	for(var i=from; i<=to; i+=prec)
		proc.vertex(x+w*Math.cos(i),y+h*Math.sin(i));
}

function update(){
	angle -= 0.01;
	if(angle>2.0*Math.PI) angle=0;
}

function draw() {
    // clear background
    proc.background(255);
	
	proc.pushMatrix();
		proc.translate(proc.width*0.5,proc.height*0.5);
		proc.rotate(angle);
		
		proc.fill(255,138,0,180);
		proc.strokeWeight(2);
		proc.stroke(166,89,0);
		proc.smooth();
		proc.beginShape();
			drawArc(0, 0, r, r, 0.5*Math.PI - alpha, 1.5*Math.PI + alpha);
			drawArc(l, 0, rr, rr, 1.5*Math.PI + alpha, 2.5*Math.PI - alpha);
		proc.endShape(proc.CLOSE);
		
		proc.strokeWeight(1);
		var tmp = r*0.5;
		proc.line(tmp, 0, -tmp, 0);
		proc.line(0, tmp, 0, -tmp);
		
		tmp = rr*0.5;
		proc.line(l+tmp, 0, l-tmp, 0);
		proc.line(l, tmp, l, -tmp);
	proc.popMatrix();
}