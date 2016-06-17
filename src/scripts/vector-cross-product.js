enabledAddingPoints = false;
var drawGuide = false, drawGuideLines = false;

var guideVector, guideLine1, guideLine2, gudeLineAngle;
var currID = 0;

function exampleInit() {
    addVectorToList(new Vector3(2, 5, 0, 1, 2, 0));
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
function calculateCrossProduct() {

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

  		var result = new Vector3().addVectors(vectorA,vectorB).setLocationFromVector(vectorA.loc);	//ADD OPERATION
      
  		/****************************
  		   Settings for guide lines
  		*****************************/
  		guideVector = new Vector3(	vectorB.x, vectorB.y, vectorB.z, vectorA.x + vectorA.loc.x, vectorA.y + vectorA.loc.y, vectorA.z + vectorA.loc.z, 0, 200, 0);
  		guideLine1 = new Vector3(	vectorA.x + vectorA.loc.x - vectorB.loc.x, vectorA.y + vectorA.loc.y - vectorB.loc.y, 0, vectorB.loc.x, vectorB.loc.y, 0, 0, 200, 0);
  		guideLine2 = new Vector3(	vectorA.x + vectorA.loc.x - vectorB.loc.x, vectorA.y + vectorA.loc.y - vectorB.loc.y, 0, vectorB.x+vectorB.loc.x, vectorB.y+vectorB.loc.y, 0, 0, 200, 0);
  		gudeLineAngle = precise_round(guideVector.angleTo(guideLine2),2);
  		dashes = Math.round(guideLine1.length())*2;
  		drawGuide = true; drawGuideLines = true;

  		currID = $("#secondvector").val();
  		vectors[currID].setColor(180,180,180);
  		setTimeout(function(){
  			addVectorToList(result);
  			drawGuideLines = false;
  			if(vectors.length>1) removedVectorUpdate(currID);

  			var target = document.getElementById( "vec"+(vectors.length-1) );
  			target.parentNode.scrollTop = target.offsetTop;

  			setTimeout(function(){ drawGuide = false; }, 3500);
  		}, 3500);
  	}
  }

  /**********************
     GUIDE LINES (DRAW)
  ***********************/

  var dashes;
  var dotDia = 1;
  function drawGuides(){
  	if(drawGuide){
  		proc.strokeWeight(3);
  		guideVector.draw();

  		if(drawGuideLines && gudeLineAngle != 0){

  			/*First guide line*/
  			var c_loc = gridToCanvasTransform(new Point(guideLine1.loc.x, guideLine1.loc.y));
  			var toX = c_loc.x + guideLine1.x * unit;
  			var toY = c_loc.y - guideLine1.y * unit;

  			proc.stroke(guideLine1.r, guideLine1.g, guideLine1.b);

  			for(var i=0; i<=dashes; i++) {
  				var x = proc.lerp(c_loc.x, toX, i/dashes);
  				var y = proc.lerp(c_loc.y, toY, i/dashes);
  				proc.ellipse(x,y,dotDia,dotDia);
  			}

  			/*Second guide line*/
  			c_loc = gridToCanvasTransform(new Point(guideLine2.loc.x, guideLine2.loc.y));
  			toX = c_loc.x + guideLine2.x * unit;
  			toY = c_loc.y - guideLine2.y * unit;

  			proc.stroke(guideLine2.r, guideLine2.g, guideLine2.b);

  			for(var i=0; i<=dashes; i++) {
  				var x = proc.lerp(c_loc.x, toX, i/dashes);
  				var y = proc.lerp(c_loc.y, toY, i/dashes);
  				proc.ellipse(x,y,dotDia,dotDia);
  			}

  		}

  		proc.strokeWeight(2);
  	}
  }
