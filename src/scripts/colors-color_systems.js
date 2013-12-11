function exampleInit() {
	showFormula({"r":0,"g":255,"b":0});
	drawDots({"r":0,"g":255,"b":0});
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
//alert(max+" "+min);
    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}

function rgbToHsv(r, g, b) {
    var
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        h, s, v = max;

    v = Math.floor(max / 255 * 100);
    if ( max != 0 )
        s = Math.floor(delta / max * 100);
    else {
        // black
        return [0, 0, 0];
    }

    if( r == max )
        h = ( g - b ) / delta;         // between yellow & magenta
    else if( g == max )
        h = 2 + ( b - r ) / delta;     // between cyan & yellow
    else
        h = 4 + ( r - g ) / delta;     // between magenta & cyan

    h = Math.floor(h * 60);            // degrees
    if( h < 0 ) h += 360;

    return [h, s, v];
}
		
	function showFormula(rgb)
	{
	//alert(JSON.stringify(rgb));
		var r=rgb["r"];
		var g=rgb["g"];
		var b=rgb["b"];
		var myArray = [r/255,g/255,b/255];
		var Cmax=(Math.max.apply(Math, myArray));
		var Cmin=(Math.min.apply(Math, myArray));
		
        var hsl=rgbToHsl(r,g,b);
		var h=(Math.round(hsl[0]));
		var s=(Math.round(hsl[1]));
		var l=(Math.round(hsl[2]));
		//alert(h+" "+s+" "+l);		
		
        var hsv=rgbToHsv(r,g,b);
		var h1=(Math.round(hsv[0]));
		var s1=(Math.round(hsv[1]));
		var v1=(Math.round(hsv[2]));		
		//alert(h1+" "+s1+" "+v1);
		
		$("#result").css({visibility : 'visible', display : 'block'});
		var AllJax = MathJax.Hub.getAllJax("result");//MathOutput
		MathJax.Hub.queue.Push([	"Text",
								AllJax[0],
								"R' = \\frac{R}{255} = \\frac{"+r+"}{255} = "+Math.round((r/255)*1000)/1000+"\\\\"+
								"G' = \\frac{G}{255} = \\frac{"+g+"}{255} = "+Math.round((g/255)*1000)/1000+"\\\\"+
								"B' = \\frac{B}{255} = \\frac{"+b+"}{255} = "+Math.round((b/255)*1000)/1000+"\\\\"
								]);
								
		MathJax.Hub.queue.Push([	"Text",
								AllJax[1],
								"C_{max} = \\max(R', G', B') = "+Math.round((Cmax)*1000)/1000+"\\\\"+
								"C_{min} = \\min(R', G', B') = "+Math.round((Cmin)*1000)/1000+"\\\\"+
								"\\Delta = C_{max} - C_{min} = "+Math.round((Cmax-Cmin)*1000)/1000
								]);
								
		MathJax.Hub.queue.Push([	"Text",
								AllJax[2],
								"H = \\begin{cases}60^\\circ * (\\frac{G'-B'}{\\Delta} \\mod{6}) &,C_{max} = R'\\\\60^\\circ * (\\frac{B'-R'}{\\Delta} + 2) &,C_{max} = G'\\\\60^\\circ * (\\frac{R'-G'}{\\Delta} + 4) &,C_{max} = B'\\end{cases}\\\\H = "+h+"^\\circ"
								]);																

		MathJax.Hub.queue.Push([	"Text",
								AllJax[3],
								"S = \\begin{cases}0 &,\\Delta=0\\\\\\frac{\\Delta}{1-|2L-1|} &,\\Delta <> 0\\end{cases}\\\\S = "+s+"\\%"
								]);																

		MathJax.Hub.queue.Push([	"Text",
								AllJax[4],
								"L = (C_{max} + C_{min}) / 2 = "+l+"\\%"
								]);	
								
		MathJax.Hub.queue.Push([	"Text",
								AllJax[5],
								"H = \\begin{cases}60^\\circ * (\\frac{G'-B'}{\\Delta} \\mod{6}) &,C_{max} = R'\\\\60^\\circ * (\\frac{B'-R'}{\\Delta} + 2) &,C_{max} = G'\\\\60^\\circ * (\\frac{R'-G'}{\\Delta} + 4) &,C_{max} = B'\\end{cases}\\\\H = "+h1+"^\\circ"
								]);																

		MathJax.Hub.queue.Push([	"Text",
								AllJax[6],
								"S = \\begin{cases}0 &,\\Delta=0\\\\\\frac{\\Delta}{C_{max}} &,\\Delta <> 0\\end{cases}\\\\S = "+s1+"\\%"
								]);											

		MathJax.Hub.queue.Push([	"Text",
								AllJax[7],
								"V = C_{max} = "+v1+"\\%"
								]);		
	}
