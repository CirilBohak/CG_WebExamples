enabledAddingPoints = false;

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
function calculateNormalization() {
  var vector = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
                parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
                0);
  var result = new Vector3().copy(vector).normalize();
  var vectorLength = vector.length();
	//show result
	$("#result").css({visibility : 'visible', display : 'block'});
  var AllJax = MathJax.Hub.getAllJax("result");//Mat
  MathJax.Hub.queue.Push([	"Text",
              	AllJax[0],
                "\\left\\|\\vec{a}\\right\\| = "+
                "\\sqrt{("+vector.x+")^2+("+vector.y+")^2}  = " + precise_round(vectorLength,2) + "\\\\"
              ]);
              MathJax.Hub.queue.Push([	"Text",
                          	AllJax[1],
                            "\\ x= x / \\left\\|\\vec{a}\\right\\| = "+ vector.x + "/" +precise_round(vectorLength,2)+"="+precise_round(result.x,2)+ "\\\\"+
                            " \\ y= y / \\left\\|\\vec{a}\\right\\| = "+ vector.y + "/"+precise_round(vectorLength,2)+"="+precise_round(result.y,2)+ "\\\\"

                          ]);

                        drawGuide = true; drawGuideLines = true;
                        currID = $("#firstvector").val();
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
