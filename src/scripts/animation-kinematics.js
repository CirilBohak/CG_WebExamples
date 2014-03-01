	enabledAddingPoints = false;
var drawGuide = false, drawGuideLines = false;

var guideColor = new Color(100, 100, 100);

var rootBone = new Bone(400, 300, 1, 0, Math.PI*0.25); //Root node
	rootBone.selected = true;
	rootBone.addChild(0)
			.addChild(0)
			.addChild(0);

var sel_From = rootBone
	sel_To = undefined; //For inverse kinematics

function exampleInit() { }

function draw() {
	//Update only selected and it's children
	if(sel_From.selected) sel_From.update();
	
    // clear background
    proc.background(255);
	
	//Draw
	rootBone.drawAll();
	
	//Show guides
	if(sel_From.selected){
		var guide_len = sel_From.length + 30;
		if(sel_From.length < 60) guide_len = 90;
		
		drawLine(sel_From.center, sel_From.direction.clone().multiplyScalar(guide_len), 1, guideColor);
		drawArrow(sel_From.center, sel_From.forward.clone().multiplyScalar(guide_len), 1, guideColor, 8);
		drawAngleArc(sel_From.center, sel_From.forward, sel_From.center, sel_From.direction, 1, 120, guideColor, sel_From.rotation);
	}
}

function mouseDragged() {
	if(sel_From.selected){
		var mouse = new Vector3(proc.mouseX - sel_From.center.x, -proc.mouseY + sel_From.center.y);
		var newAngle = mouse.angleTo(sel_From.forward);
		var direc = newAngle == 0 ? 1 : angleDirection(mouse, sel_From.forward, {x: 0, y: 0, z:1});
		
		sel_From.rotation = direc * newAngle;
		sel_From.updateDirection();
	}
}

function mouseClicked() {
	/*TODO Better: Time efficient*/
	for(var bone = rootBone; bone != undefined; bone = bone.child){
		if(bone.mouseClicked(proc.mouseX, proc.mouseY)){
			if(bone != sel_From) sel_From.selected = false;
			sel_From = bone;
		}
	}
}