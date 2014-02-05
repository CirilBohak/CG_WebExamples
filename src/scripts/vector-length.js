enabledAddingPoints = false;
var drawGuide = false;

var refVec, guideLine, guideLine1, guideLine2, lablePos, length;
var currID = 0;

function exampleInit() {
    addVectorToList(new Vector3(2, 5, 0, 1, 2, 0));
    addVectorToList(new Vector3(6, 3, 0, -2, 2, 0));
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
function calculateLength() {
	if(!drawGuide){
		var vector = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
									parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
									0,
									parseInt($($("#vec"+$("#firstvector").val()+" input")[2]).val()),
									parseInt($($("#vec"+$("#firstvector").val()+" input")[3]).val()),
									0);
		
		length = precise_round(vector.length(),2);
		
		/****************************
		   Settings for guide lines
		*****************************/
		refVec = new Vector3().crossVectors({x:0,y:0,z:1}, vector).normalize();
		refVec.setLocationFromVector(vector.loc);
		
		guideLine = vector.clone(); guideLine.loc.add(refVec); guideLine.setColor(0,200,0);
		guideLine1 = refVec.clone().multiplyScalar(1.3); guideLine1.setLocationFromVector(vector.clone().add(vector.loc)); guideLine1.setColor(0,200,0);
		guideLine2 = refVec.clone().multiplyScalar(1.3); guideLine2.setLocationFromVector(vector.loc); guideLine2.setColor(0,200,0);
		
		var halfLen = guideLine.length()*0.5;
		lablePos = guideLine.clone().normalize().multiplyScalar(halfLen); lablePos.loc.add(refVec);
		
		drawGuide = true;
		
		
		currID = $("#firstvector").val();
		setTimeout(function(){
			drawGuide = false;
		}, 5500);
		
		/****************
		  MathJax result
		*****************/
		$("#result").css({visibility : 'visible', display : 'block'});
		MathJax.Hub.queue.Push([	"Text",
									MathJax.Hub.getAllJax("MathOutput")[0],
									length
								]);
	}
}

function drawGuides(){
	if(drawGuide){
		proc.strokeWeight(1);
		guideLine.drawArrow(5, true);
		
		/* First guide line */
		var c_loc = gridToCanvasTransform(new Point(guideLine1.loc.x, guideLine1.loc.y));
		var toX = c_loc.x + guideLine1.x * unit;
		var toY = c_loc.y - guideLine1.y * unit;
		
		proc.stroke(guideLine1.r, guideLine1.g, guideLine1.b);
		proc.line(c_loc.x, c_loc.y, toX, toY);
		
		/* Second guide line */
		c_loc = gridToCanvasTransform(new Point(guideLine2.loc.x, guideLine2.loc.y));
		toX = c_loc.x + guideLine2.x * unit;
		toY = c_loc.y - guideLine2.y * unit;
		
		proc.stroke(guideLine2.r, guideLine2.g, guideLine2.b);
		proc.line(c_loc.x, c_loc.y, toX, toY);
		
		/* Length label */
		c_loc = gridToCanvasTransform(new Point(lablePos.loc.x, lablePos.loc.y));
		toX = c_loc.x + lablePos.x * unit;
		toY = c_loc.y - lablePos.y * unit;
		
		var ctx = canvas.getContext("2d");
		ctx.font="15px Arial";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.lineWidth = 5; ctx.strokeStyle = 'white';
		ctx.strokeText(length, toX, toY);
		
		ctx.fillStyle = 'rgb('+guideLine.r+","+ guideLine.g+","+ guideLine.b+")";
		ctx.fillText(length, toX, toY);
		
		proc.strokeWeight(2);
	}
}
