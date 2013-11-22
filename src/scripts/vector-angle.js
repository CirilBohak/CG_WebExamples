function exampleInit() {
    addVectorToList(new Vector3(2, 5, 0, 1, 2, 0));
    addVectorToList(new Vector3(6, 3, 0,-2, 2, 0));
}

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
<<<<<<< HEAD
    $("#vectorList").append(
        "<div id=\"vec"+ (vectors.length - 1) +"\" class=\"vectorItem\">"+
            "<div class=\"floatLeft vectorValue\">"+
                "Vector " + (vectors.length - 1) + ":"+
                "<br />"+
                "<div class=\"squareBracket\">"+
                    "["+
                "</div>"+
                "<div class=\"floatLeft\">"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.x+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.y+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
                "</div>"+
                "<div class=\"squareBracket\">"+
                    "]"+
                "</div>"+
            "</div>"+
            "<div class=\"vectorValue\">"+
                "Point " + (vectors.length - 1) + ":"+
                "<br />"+
                "<div class=\"squareBracket\">"+
                    "["+
                "</div>"+
                "<div class=\"floatLeft\">"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.locX+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.locY+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
                "</div>"+
                "<div class=\"squareBracket\">"+
                    "]"+
                "</div>"+
            "</div>"+
            "<div class=\"paddingLeft\">"+
                "<button type=\"button\" onClick=\"vectors["+(vectors.length-1)+"].negate()\">Negate</button>"+
            "</div>"+
        "</div>"+
        "<br /><br />");
    $("#vec"+ (vectors.length - 1) +" input").on('change', function () { updateVectors(false); });
	updateDropDownLists(vectors.length - 1);	
}

function precise_round(num,decimals){
return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
=======
	
    createVectorSelection(vec, vectors.length-1);
	
	updateVectorDropDownLists(vectors.length - 1);	
>>>>>>> origin/dp3698_E-Learning
}

/****************
   CALCULATION
*****************/
function calculateAngle() {
	var vectorA = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0);
	
	var vectorB = new Vector3(	parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val()),
								0);
	
<<<<<<< HEAD
	$("#result").html("<b>Result:</b><br />a*b = ("+firstVectorX+", "+firstVectorY+")*("+secondVectorX+", "+secondVectorY+") = ("+firstVectorX+")*("+secondVectorX+")+("+firstVectorY+")*("+secondVectorY+") = "+dotProduct+"<br />||a||*||b|| = sqrt(("+firstVectorX+")^2+("+firstVectorY+")^2)*sqrt(("+secondVectorX+")^2+("+secondVectorY+")^2) = "+precise_round(firstVectorLength*secondVectorLength,2)+"<br /><br />&Phi;=arcCos(a*b / ||a||*||b||) = "+precise_round((angle*57.2957795),2)+"&deg;");
}

// updating vector values
function updateVectors(values) {
    if (!values) {
        for (var i = 0; i < vectors.length; i++) {
            var vals = $("#vec"+i+" input");
            var vec = vectors[i];
            vec.x = $(vals[0]).val();
            vec.y = $(vals[1]).val();
            vec.locX = $(vals[2]).val();
            vec.locY = $(vals[3]).val();
        }
    } else {
        for (var i = 0; i < vectors.length; i++) {
            var vals = $("#vec"+i+" input");
            var vec = vectors[i];
            $(vals[0]).val(vec.x);
            $(vals[1]).val(vec.y);
            $(vals[2]).val(vec.locX);
            $(vals[3]).val(vec.locY);
        }
    }
}


// update drop down lists when adding a new point
function updateDropDownLists(vectorIndex)
{
	$("#firstvector").append('<option value=\"'+vectorIndex+'\">Vector '+vectorIndex+'</option>');	
	$("#secondvector").append('<option value=\"'+vectorIndex+'\">Vector '+vectorIndex+'</option>');	
}
=======
	var dotProduct = new Vector3().dotVectors(vectorA,vectorB);
	var vectorA_Length = vectorA.length();
	var vectorB_Length = vectorB.length();
	var angle = Math.acos(precise_round(dotProduct/(vectorA_Length * vectorB_Length),3));
	
	//show result
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
								"\\arccos\\left(\\frac{\\vec{a}*\\vec{b}}{\\|\\vec{a}\\| * \\|\\vec{b}\\|}\\right) = "+precise_round((angle*57.2957795),2)+"^\\circ\\\\"
							]);
}
>>>>>>> origin/dp3698_E-Learning
