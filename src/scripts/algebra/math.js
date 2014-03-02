function precise_round(num,decimals){ return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals); }

function degree_to_rad(degree){ return degree*Math.PI/180; }
function rad_to_degree(rad){ return rad*180/Math.PI; }

function clamp( x, a, b ) { return ( x < a ) ? a : ( ( x > b ) ? b : x ); }

function randomIntFromInterval(min,max){return Math.floor(Math.random()*(max-min+1)+min); }

/*Vector functions*/
/*TODO: move to vector*/
function interpolate(alpha, x0, x1){
	return x0.clone().add(x1.clone().sub(x0).multiplyScalar(alpha));
}

function rotate2D(vector, theta, result){
	result.x = vector.x * Math.cos(theta) - vector.y * Math.sin(theta);
	result.y = vector.x * Math.sin(theta) + vector.y * Math.cos(theta);
}

function angleDirection(fwd, target, up) {
	var perp = new Vector3().crossVectors(fwd, target);
	var dir = perp.dot(up);
	
    if (dir > 0.0) return 1.0;
    else /*if (dir <= 0.0)*/ return -1.0;
	//else return 0.0;
}


/*Intersection functions*/
/*TODO: move to special file for physics or collision detections*/
function poly_point_intersect(vertxes, point){
	var nvert = vertxes.length, i = 0, j = nvert-1, c = false;
	for (; i < nvert; j = i++) {
		if (((vertxes[i].y > point.y) != (vertxes[j].y > point.y)) && 
			(point.x < (vertxes[j].x-vertxes[i].x) * (point.y-vertxes[i].y) / (vertxes[j].y-vertxes[i].y) + vertxes[i].x) ) c = !c;
	}
	return c;
}

function circle_point_intersect(r, cx, cy, point){
	return (Math.pow(point.x - cx,2) + Math.pow(point.y - cy,2)) < (r*r);
}