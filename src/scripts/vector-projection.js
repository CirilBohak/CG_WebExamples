enabledAddingPoints = false;
var drawGuide = false, drawGuideLines = false;

var guideVector, guideLine1, guideLine2, gudeLineAngle;
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
function calculateProjection() {
	var vectorA = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0);
	var vectorB = new Vector3(	parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val()),
								0);

	var dotProduct = new Vector3().dotVectors(vectorA,vectorB);
  var length = Math.sqrt(Math.pow(vectorB.length(), 2));
  var result = new Vector3().copy(vectorB).multiplyScalar(dotProduct/Math.pow(length,2));
      $("#result").css({visibility : 'visible', display : 'block'});
      var AllJax = MathJax.Hub.getAllJax("result");
      MathJax.Hub.queue.Push([	"Text",
                    AllJax[0],
                    "\\vec{a}*\\vec{b}=\\left[\\begin{array}{c}"+precise_round(vectorA.x, 2)+"\\\\"+ precise_round(vectorA.y,2)+"\\end{array}\\right]*\\left[\\begin{array}{c}"+precise_round(vectorB.x,2)+"\\\\"+ precise_round(vectorB.y,2)+"\\end{array}\\right]=\\\\"+
                    "("+precise_round(vectorA.x,2)+")*("+precise_round(vectorB.x,2)+") + ("+precise_round(vectorA.y,2)+")*("+precise_round(vectorB.y,2)+") = "+dotProduct + "\\\\"
                    ]);
      MathJax.Hub.queue.Push([	"Text",
                  	AllJax[1],
                    "\\left\\|\\vec{b}\\right\\|^2 = "+
                    "\\sqrt{("+precise_round(vectorB.x, 2)+")^2+("+ precise_round(vectorB.y, 2)+")^2}  = " + precise_round(length,2) + "\\\\"
                  ]);
      MathJax.Hub.queue.Push([	"Text",
                              	AllJax[2],
                                "\\left(\\frac{\\vec{a}*\\vec{b}}{\\|\\vec{b}\\|^2}\\right) *\\vec{b}\\ = \\left[\\begin{array}{c}"+precise_round(result.x, 2)+"\\\\"+ precise_round(result.y,2)+"\\end{array}\\right]\\\\"
                              ]);

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

                          			var target = document.getElementById( "vec"+(vectors.length-1) );
                          			target.parentNode.scrollTop = target.offsetTop;

                          			setTimeout(function(){ drawGuide = false; }, 3500);
                          		}, 3500);
                          	}
