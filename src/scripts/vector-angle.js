enabledAddingPoints = false;
var drawGuide = false;

var guideVector, guideLine1, guideLine2, lablePos, angle, angleA, angleB;
var currID = 0;

function exampleInit() {
    addVectorToList(new Vector3(2, 5, 0, 1, 2, 0));
    addVectorToList(new Vector3(6, 3, 0,-2, 2, 0));
}

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
	
    createVectorSelection(vec, vectors.length-1);
	
	updateVectorDropDownLists(vectors.length - 1);	
	var target = document.getElementById( "vec"+(vectors.length-1) );
	target.parentNode.scrollTop = target.offsetTop;
}

/****************
   CALCULATION
*****************/
function calculateAngle() {
	if(!drawGuide){
		var vectorA = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
									parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
									0,
									parseInt($($("#vec"+$("#firstvector").val()+" input")[2]).val()),
									parseInt($($("#vec"+$("#firstvector").val()+" input")[3]).val()),
									0);

		var vectorB = new Vector3(	parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val()),
									parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val()),
									0,
									parseInt($($("#vec"+$("#secondvector").val()+" input")[2]).val()),
									parseInt($($("#vec"+$("#secondvector").val()+" input")[3]).val()),
									0);
		
		var dotProduct = new Vector3().dotVectors(vectorA,vectorB),
			vectorA_Length = vectorA.length(), 
			vectorB_Length = vectorB.length();
			
		angle = vectorA.angleTo(vectorB);
		
		/****************************
		   Settings for guide lines
		*****************************/
		guideVector = new Vector3(	vectorB.x, vectorB.y, vectorB.z, vectorA.loc.x, vectorA.loc.y, vectorA.loc.z, 0, 200, 0);
		guideLine1 = new Vector3(	vectorA.loc.x-vectorB.loc.x, vectorA.loc.y-vectorB.loc.y, 0, vectorB.loc.x, vectorB.loc.y, 0, 0, 200, 0);
		guideLine2 = new Vector3(	vectorA.loc.x-vectorB.loc.x, vectorA.loc.y-vectorB.loc.y, 0, vectorB.x+vectorB.loc.x, vectorB.y+vectorB.loc.y, 0, 0, 200, 0);
		
		var sign = angleDirection(new Vector3(0,0,1),vectorB,new Vector3(1,0,0));
			angleB = new Vector3(1,0,0).angleTo(vectorB);
			angleB *= sign;
		sign = angleDirection(new Vector3(0,0,1),vectorA,new Vector3(1,0,0));
			angleA = new Vector3(1,0,0).angleTo(vectorA);
			angleA *= sign;
		
		lablePos = new Vector3().addVectors(vectorA.clone().normalize(),vectorB.clone().normalize());
		if(angleA<angleB) lablePos = new Vector3().crossVectors(vectorA,{x:0,y:0,z:1});
		else lablePos = new Vector3().crossVectors(vectorB,{x:0,y:0,z:1});
		lablePos.normalize().multiplyScalar(arcDia/unit); lablePos.setLocation(vectorA.loc.x, vectorA.loc.y, vectorA.loc.z);
		
		dashes = Math.round(guideLine1.length())*2;
		drawGuide = true;
		
		currID = $("#secondvector").val();
		vectors[currID].setColor(180,180,180);
		setTimeout(function(){
			drawGuide = false;
			vectors[currID].setColor(0,0,0);
		}, 5500);
		
		/****************
		  MathJax result
		*****************/
		$("#result").css({visibility : 'visible', display : 'block'});
		var AllJax = MathJax.Hub.getAllJax("result");//MathOutput
		MathJax.Hub.queue.Push([	"Text",
									AllJax[0],
									"\\vec{a}*\\vec{b}=\\left[\\begin{array}{c}"+vectorA.x+"\\\\"+vectorA.y+"\\end{array}\\right]*\\left[\\begin{array}{c}"+vectorB.x+"\\\\"+vectorB.y+"\\end{array}\\right]=\\\\"+
									"("+vectorA.x+")*("+vectorA.y+") + ("+vectorB.x+")*("+vectorB.y+") = "+dotProduct + "\\\\"
									]);
		
		MathJax.Hub.queue.Push([	"Text",
									AllJax[1],
									"\\left\\|\\vec{a}\\right\\| * \\left\\|\\vec{b}\\right\\| = \\\\"+
									"\\sqrt{"+vectorA.x+"^2+"+vectorA.y+"^2} * \\sqrt{"+vectorB.x+"^2+"+vectorB.y+"^2} = " + precise_round(vectorA_Length*vectorB_Length,2) + "\\\\"
								]);
		
		MathJax.Hub.queue.Push([	"Text",
									AllJax[2],
									"\\arccos\\left(\\frac{\\vec{a}*\\vec{b}}{\\|\\vec{a}\\| * \\|\\vec{b}\\|}\\right) = "+precise_round(rad_to_degree(angle),2)+"^\\circ\\\\"
								]);
	}
}

/**********************
   GUIDE LINES (DRAW)
***********************/

var dashes;
var dotDia = 1;
var arcDia = 60;
function drawGuides(){
	if(drawGuide){
		proc.strokeWeight(3);
		
		guideVector.draw();
		
		/* First guide line */
		var c_loc = gridToCanvasTransform(new Point(guideLine1.loc.x, guideLine1.loc.y));
		var toX = c_loc.x + guideLine1.x * unit;
		var toY = c_loc.y - guideLine1.y * unit;
		
		proc.stroke(guideLine1.r, guideLine1.g, guideLine1.b);
		
		for(var i=0; i<=dashes; i++) {
			var x = proc.lerp(c_loc.x, toX, i/dashes);
			var y = proc.lerp(c_loc.y, toY, i/dashes);
			proc.ellipse(x,y,dotDia,dotDia);
		}
		
		/* Second guide line */
		c_loc = gridToCanvasTransform(new Point(guideLine2.loc.x, guideLine2.loc.y));
		toX = c_loc.x + guideLine2.x * unit;
		toY = c_loc.y - guideLine2.y * unit;
		
		proc.stroke(guideLine2.r, guideLine2.g, guideLine2.b);
		
		for(var i=0; i<=dashes; i++) {
			var x = proc.lerp(c_loc.x, toX, i/dashes);
			var y = proc.lerp(c_loc.y, toY, i/dashes);
			proc.ellipse(x,y,dotDia,dotDia);
		}
		
		proc.strokeWeight(1);
		
		/* Angle arc */
		c_loc = gridToCanvasTransform(new Point(guideVector.loc.x, guideVector.loc.y));
		proc.noFill();
		
		if(angleA<angleB){
			if(precise_round(angleB-angleA,7)==precise_round(angle,7)) proc.arc(c_loc.x, c_loc.y, arcDia, arcDia, angleA, angleB);
			else proc.arc(c_loc.x, c_loc.y, arcDia, arcDia, angleB, angleB+angle);
		}else{ 
			if(precise_round(angleA-angleB,7)==precise_round(angle,7)) proc.arc(c_loc.x, c_loc.y, arcDia, arcDia, angleB, angleA);
			else proc.arc(c_loc.x, c_loc.y, arcDia, arcDia, angleA, angleA+angle);
		}
		
		proc.strokeWeight(2);
		
		/* Angle label */
		c_loc = gridToCanvasTransform(new Point(lablePos.loc.x, lablePos.loc.y));
		toX = c_loc.x + lablePos.x * unit;
		toY = c_loc.y - lablePos.y * unit;
		
		var ctx = canvas.getContext("2d");
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.lineWidth = 5; ctx.strokeStyle = 'white';
		ctx.strokeText(precise_round(rad_to_degree(angle),2)+"\u00B0", toX, toY);
		
		ctx.fillStyle = 'rgb('+guideLine2.r+","+ guideLine2.g+","+ guideLine2.b+")";
		ctx.fillText(precise_round(rad_to_degree(angle),2)+"\u00B0", toX, toY);
	}
}

function angleDirection(fwd, target, up) {
	var perp = new Vector3().crossVectors(fwd, target);
	var dir = perp.dot(up);
	
    if (dir > 0.0) return 1.0;
    else /*if (dir <= 0.0)*/ return -1.0;
	//else return 0.0;
}