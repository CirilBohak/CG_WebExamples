var can, ctx, grad,
	radius = 280, thickness = 280,
	start = -Math.PI*0.5, end = start + 2*Math.PI, step = Math.PI / 90,
	ang,
	rgb, hsl, hsv;

function exampleInit() {
	can = document.getElementById("surface");
	ctx = can.getContext("2d");
	ctx.translate(can.width*0.5, can.height*0.5);
	
	rgb = {r:0,g:255,b:0};
	hsl = rgbToHsl(rgb.b, rgb.g, rgb.b);
	hsv = rgbToHsv(rgb.b, rgb.g, rgb.b);
	showFormula(rgb,hsl,hsv); drawColorFan(rgb,hsl,hsv);
	
	$("#result").css({visibility : 'visible', display : 'block'});
}

function rgbToHsl(r, g, b){
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	
	if(max == min) h = s = 0; // achromatic
	else{
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}
	return {h: Math.floor(h * 360), s: Math.floor(s * 100), l:Math.floor(l * 100)};
}

function rgbToHsv(r, g, b) {
	var min = Math.min(r, g, b),
		max = Math.max(r, g, b),
		delta = max - min,
		h, s, v = max;
	
	v = Math.floor(max / 255 * 100);
	if ( max != 0 ) s = Math.floor(delta / max * 100);
	else return [0, 0, 0]; // black

	if( r == max ) h = ( g - b ) / delta;         		// between yellow & magenta
	else if( g == max ) h = 2 + ( b - r ) / delta;		// between cyan & yellow
	else h = 4 + ( r - g ) / delta;						// between magenta & cyan

	h = Math.floor(h * 60);            					// degrees
	if( h < 0 ) h += 360;
	
	return {h:h, s:s, v:v};
}

function showFormula(rgb, hsl, hsv){
	var myArray = [rgb.r/255,rgb.g/255,rgb.b/255],
		Cmax = (Math.max.apply(Math, myArray)),
		Cmin = (Math.min.apply(Math, myArray));
	
	var AllJax = MathJax.Hub.getAllJax("result");//MathOutput
	MathJax.Hub.queue.Push(["Text", AllJax[0], "R' = \\frac{R}{255} = \\frac{"+rgb.r+"}{255} = "+precise_round(myArray[0],2)+"\\\\"+
							"G' = \\frac{G}{255} = \\frac{"+rgb.g+"}{255} = "+precise_round(myArray[1],2)+"\\\\"+
							"B' = \\frac{B}{255} = \\frac{"+rgb.b+"}{255} = "+precise_round(myArray[2],2)+"\\\\" ]);
	MathJax.Hub.queue.Push(["Text", AllJax[1], "C_{max} = \\max(R', G', B') = "+precise_round(Cmax,2)+"\\\\"+
							"C_{min} = \\min(R', G', B') = "+precise_round(Cmin,2)+"\\\\"+
							"\\Delta = C_{max} - C_{min} = "+precise_round(Cmax-Cmin,2)+"\\" ]);
	MathJax.Hub.queue.Push(["Text", AllJax[3], "H = "+hsl.h+"^\\circ" ]);
	MathJax.Hub.queue.Push(["Text", AllJax[5], "S = "+hsl.s+"\\%" ]);
	MathJax.Hub.queue.Push(["Text", AllJax[6], "L = \\frac{(C_{max} + C_{min})}{2} = "+hsl.l+"\\%" ]);
	MathJax.Hub.queue.Push(["Text", AllJax[8], "H = "+hsv.h+"^\\circ" ]);
	MathJax.Hub.queue.Push(["Text", AllJax[10], "S = "+hsv.s+"\\%" ]);
	MathJax.Hub.queue.Push(["Text", AllJax[11], "V = C_{max} = "+hsv.v+"\\%" ]);
}

function drawColorFan(rgb, hsl, hsv) {
	ctx.clearRect ( -300 , -300 , 600 , 600 );
	
	for (ang = start; ang <= end; ang += step) {
		ctx.save();
		ctx.rotate(ang);
		
		h = Math.floor(360 - (ang - start)/(end - start) * 360);
		
		/*Gradient*/
		grad = ctx.createLinearGradient(0, radius - thickness, 0, radius);
		grad.addColorStop(0, 'hsl('+ h +',0%,0%)');
		grad.addColorStop(.5, 'hsl('+ h +','+hsl.s+'%,50%)');
		grad.addColorStop(1, 'hsl('+ h +',100%,100%)');
		
		/*Trapezoid*/
		ctx.beginPath();
			ctx.moveTo(-5,radius);
			ctx.lineTo(-2,radius-thickness);
			ctx.lineTo(2,radius-thickness);
			ctx.lineTo(5,radius);
		ctx.closePath();
		ctx.fillStyle = grad; 
		ctx.fill();
		ctx.restore();
	}
	
	/*selected color*/
	ctx.save();
	ctx.rotate(-degree_to_rad(hsv.h)+start);
		var rt = radius-(thickness*(1-(hsl.l*0.01)));
		grad = ctx.createRadialGradient(0, rt, 0,   0, rt, 10);		
		grad.addColorStop(0, 'rgba(0,0,0,0.5)');
		grad.addColorStop(0.5, 'rgba(255,255,255,1)');
		grad.addColorStop(1, 'rgba(255,255,255,0)');
		
		ctx.fillStyle = grad;
		
		/*circle*/
		ctx.beginPath();
			ctx.arc(0, rt, 10, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
	ctx.restore();
}