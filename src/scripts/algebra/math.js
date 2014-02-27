function precise_round(num,decimals){
	return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
}

function degree_to_rad(degree){ return degree*Math.PI/180; }
function rad_to_degree(rad){ return rad*180/Math.PI; }

function clamp( x, a, b ) { return ( x < a ) ? a : ( ( x > b ) ? b : x ); }

/*Vector function*/
function angleDirection(fwd, target, up) {
	var perp = new Vector3().crossVectors(fwd, target);
	var dir = perp.dot(up);
	
    if (dir > 0.0) return 1.0;
    else /*if (dir <= 0.0)*/ return -1.0;
	//else return 0.0;
}