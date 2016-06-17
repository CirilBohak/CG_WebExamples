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
function calculateScalarProduct() {
	var vector = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0);
	var number = parseInt($("#inputScalar").val());
  var vectorCopy = new Vector3().copy(vector).multiplyScalar(number).setLocationFromVector(vector.loc);
	//show result
	$("#result").css({visibility : 'visible', display : 'block'});
	MathJax.Hub.queue.Push([	"Text",
								MathJax.Hub.getAllJax("result")[0],
									number+" * ("+vector.x+","+ vector.y+","+vector.z+")=("+vectorCopy.x+","+ vectorCopy.y+")"
							]);
  drawGuide = true; drawGuideLines = true;
  currID = $("#firstvector").val();
  vectors[currID].setColor(180,180,180);
  setTimeout(function(){
          			addVectorToList(vectorCopy);
          			drawGuideLines = false;
          			if(vectors.length>1) removedVectorUpdate(currID);

          			var target = document.getElementById( "vec"+(vectors.length-1) );
          			target.parentNode.scrollTop = target.offsetTop;

          			setTimeout(function(){ drawGuide = false; }, 3500);
          		}, 3500);
          	}
