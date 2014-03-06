function drawPoint(point, size, color, width){
	proc.smooth();
	proc.strokeWeight(width || 2);
	proc.stroke(color.r, color.g, color.b, color.a);
	proc.ellipse(point.x, point.y, size, size);
}

/*
	dashes   ... number of dashes in line
	dot_size ... dash diameter
*/
function drawLine(point, vector, length, color, dashes, dot_size){
	//var c_loc = gridToCanvasTransform(guideLinePoint1);
	var toX = point.x + vector.x * length;
	var toY = point.y - vector.y * length;
	
	proc.stroke(color.r, color.g, color.b, color.a);
	
	if(dashes !== undefined){
		for(var i=0; i<=dashes; i++) {
			var x = proc.lerp(point.x, toX, i/dashes);
			var y = proc.lerp(point.y, toY, i/dashes);
			proc.ellipse(x,y,dot_size,dot_size);
		}
	}else proc.line(point.x, point.y, toX, toY);
}

/*	drawArrow(point, vector, length, color, headLen, heads)

	point   ... location
	vector  ... direction
	length  ... size
	color   ... arrow colour
	headLen ... arrow head size
	heads   ... (true/false) if arrow head on both sides
*/
function drawArrow(point, vector, length, color, headLen, heads) {
	var toX = point.x + vector.x * length;
	var toY = point.y - vector.y * length;
	proc.stroke(color.r, color.g, color.b, color.a);
	proc.line(point.x, point.y, toX, toY);
	
	var headLen = (headLen !== undefined) ? headLen:14;
	var angle = 0;
	
	angle = Math.atan2(toY-point.y,toX-point.x);
	proc.line(toX, toY, toX - headLen * Math.cos(angle - Math.PI / 8), toY - headLen * Math.sin(angle - Math.PI / 8));
	proc.line(toX, toY, toX - headLen * Math.cos(angle + Math.PI / 8), toY - headLen * Math.sin(angle + Math.PI / 8));
	
	if(heads !== undefined){
		angle = Math.atan2(point.y-toY,point.x-toX);
		proc.line(point.x, point.y, point.x - headLen * Math.cos(angle - Math.PI / 8), point.y - headLen * Math.sin(angle - Math.PI / 8));
		proc.line(point.x, point.y, point.x - headLen * Math.cos(angle + Math.PI / 8), point.y - headLen * Math.sin(angle + Math.PI / 8));
	}
}

/*
	length ... scale factor
	size   ... distance from original vector
*/
function drawLineLength(point, vector, length, size, color){
	var refVec = new Vector3().crossVectors({x:0,y:0,z:1}, vector).normalize();
	
	var guidePoint = new Point(	point.x + refVec.x * length * size,
								point.y - refVec.y * length * size),
		guideLine = vector;
	var guideLinePoint1 = new Point(point.x + vector.x * length,
									point.y - vector.y * length),
		guideLine1 = refVec.clone().multiplyScalar(1.3 * size);
	var guideLinePoint2 = point,
		guideLine2 = refVec.clone().multiplyScalar(1.3 * size);
		
		
	var len = vector.length(),
		lablePosPoint = guidePoint,
		lablePos = vector.clone().normalize().multiplyScalar(len*0.5);
	len = precise_round(len,2);
	
	proc.strokeWeight(1);
	
	//Guide lines
	drawArrow(guidePoint, guideLine, length, color, 5, true);
	
	drawLine(guideLinePoint1, guideLine1, length, color);
	drawLine(guideLinePoint2, guideLine2, length, color);
	
	//Label
	toX = lablePosPoint.x + lablePos.x * unit;
	toY = lablePosPoint.y - lablePos.y * unit;
	
	var ctx = canvas.getContext("2d");
	ctx.font="15px Arial";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.lineWidth = 5; ctx.strokeStyle = 'white';
	ctx.strokeText(len, toX, toY);
	
	ctx.fillStyle = 'rgba('+color.r+","+ color.g+","+ color.b+","+ color.a+")";
	ctx.fillText(len, toX, toY);
}

/*
	real_angle ... for correct angle input
*/
function drawAngleArc(pointA, vectorA, pointB, vectorB, length, arc_size, color, real_angle){
	var angle = real_angle != undefined ? real_angle : vectorA.angleTo(vectorB);
	
	var sign = angleDirection(new Vector3(0,0,1),vectorB,new Vector3(1,0,0));
	var angleB = new Vector3(1,0,0).angleTo(vectorB);
		angleB *= sign;
	sign = angleDirection(new Vector3(0,0,1),vectorA,new Vector3(1,0,0));
	var angleA = new Vector3(1,0,0).angleTo(vectorA);
		angleA *= sign;
	
	var labelPosPoint = pointA; 
	var lablePos = new Vector3().addVectors(vectorA.clone().normalize(),vectorB.clone().normalize());
	
	//Angle arc
	proc.strokeWeight(1);
	proc.stroke(color.r, color.g, color.b, color.a);
	proc.noFill();
	
	if(angleA<angleB){
		if(precise_round(angleB-angleA,7)==precise_round(Math.abs(angle),7)){ 
			if(lablePos.length() == 0) lablePos = new Vector3().crossVectors({x:0,y:0,z:1},vectorB);
			proc.arc(pointA.x, pointA.y, arc_size, arc_size, angleA, angleB);
		}else{ 
			if(lablePos.length() == 0) lablePos = new Vector3().crossVectors({x:0,y:0,z:1},vectorA);
			proc.arc(pointA.x, pointA.y, arc_size, arc_size, angleB, angleB+Math.abs(angle));
		}
	}else{ 
		if(precise_round(angleA-angleB,7)==precise_round(Math.abs(angle),7)){ 
			if(lablePos.length() == 0) lablePos = new Vector3().crossVectors(vectorB,{x:0,y:0,z:1}); 
			proc.arc(pointA.x, pointA.y, arc_size, arc_size, angleB, angleA);
		}else{ 
			if(lablePos.length() == 0) lablePos = new Vector3().crossVectors(vectorA,{x:0,y:0,z:1}); 
			proc.arc(pointA.x, pointA.y, arc_size, arc_size, angleA, angleA+Math.abs(angle));
		}
	}
	
	if(Math.abs(angle) > Math.PI) lablePos.negate();
	
	lablePos.normalize().multiplyScalar((arc_size*0.5 + 25)/length);
	
	proc.strokeWeight(2);
	
	//Angle label
	toX = labelPosPoint.x + lablePos.x * length;
	toY = labelPosPoint.y - lablePos.y * length;
	
	var ctx = canvas.getContext("2d");
	ctx.font="15px Arial";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.lineWidth = 5; ctx.strokeStyle = 'white';
	ctx.strokeText(precise_round(rad_to_degree(angle),2)+"\u00B0", toX, toY);
	
	ctx.fillStyle = 'rgba('+color.r+","+ color.g+","+ color.b+","+ color.a+")";
	ctx.fillText(precise_round(rad_to_degree(angle),2)+"\u00B0", toX, toY);
}

/*Draw AAHalfPlane*/

function drawAAHalfPlane(direction, distance, color, width){
	proc.stroke(color.r, color.g, color.b, color.a);
	proc.strokeWeight(width || 2);
	
	//TODO: transformable
	var topLeft = {x: 0, y: 0};
	var bottomRight = {x: proc.width, y: proc.height};
	
	switch(direction){
		case 0: proc.line(distance, topLeft.y, distance, bottomRight.y); break; //AxisDirectionPositiveX
		case 1: proc.line(-distance, topLeft.y, -distance, bottomRight.y); break; //AxisDirectionNegativeX
		case 2: proc.line(topLeft.x, distance, bottomRight.x, distance); break; //AxisDirectionPositiveY
		case 3: proc.line(topLeft.x, -distance, bottomRight.x, -distance); break; //AxisDirectionNegativeY
		default: break;
	}
}

/*Draw HalfPlane*/

function drawHalfPlane(normal, distance, color, width){
	proc.stroke(color.r, color.g, color.b, color.a);
	proc.strokeWeight(width || 2);
	
	//TODO: transformable
	var topLeft = {x: 0, y: 0};
	var bottomRight = {x: proc.width, y: proc.height};
	
	var k = -normal.x/normal.y;
	var point = normal.clone().multiplyScalar(distance);
	var n = point.y - k * point.x;
	
	var y0 = k * topLeft.x + n;
	var y1 = k * bottomRight.x + n;
	
	proc.line(topLeft.x, y0, bottomRight.x, y1);
}

/*Draw convex*/

function drawConvex(vertices, color, position, rotationAngle, width){
	var offset;
	if(position != undefined){
		drawPoint(position, 5, color, 2);
		offset = position;
	}else offset = new Vector3();
	var angle = rotationAngle != undefined ? rotationAngle : 0;
	var transform = new Matrix4().makeTranslation(offset.x, offset.y, 0).multiply(new Matrix4().makeRotationZ(angle));
	
	//proc.stroke(color.r, color.g, color.b, color.a);
	proc.strokeWeight(width || 2);
	
	for (var i = 0; i < vertices.length; i++) {
		var j = (i+1) % vertices.length;
		
		var start = vertices[i].clone().applyMatrix(transform);
		var end = vertices[j].clone().applyMatrix(transform);
		
		proc.line(start.x, start.y, end.x, end.y);
	}
}