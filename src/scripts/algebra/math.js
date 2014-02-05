function precise_round(num,decimals){
	return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
}

function degree_to_rad(degree){ return degree*Math.PI/180; }
function rad_to_degree(rad){ return rad*180/Math.PI; }

function clamp( x, a, b ) { return ( x < a ) ? a : ( ( x > b ) ? b : x ); }