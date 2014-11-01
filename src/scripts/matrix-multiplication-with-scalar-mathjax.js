

$( document ).ready(function() {
	var container = $(".MathJaxStuff");
	var incNumber = Math.floor((Math.random() * 20) - 10);
	var n = Math.floor(Math.random() * 5) + 2, m = Math.floor(Math.random() * 5) + 2;

	function InitMathJaxExample(){

		var matrix = MathJax.Hub.getAllJax("matrix1")[0];

		var text = "\\left[\\begin{array}{";
		text+=m*"r";
		text+="}";
		/*\left[\begin{array}{rrr}
		1 & 2 & 4 & 8 \\
				16 & 32 & 64 & 128 \\
				256 & 512 & 1024 & 2048
				\end{array}\right]*/
		var first;
		for(var i=0;i<n;i++){
			first = true;
			for(var j=0;j<m;j++){
				if(!first){
					text+="&";
				}
				var input = Math.floor((Math.random()*100)-50);
				//text
				text+=input;
				first = false;
			}
			text+="\\\\";
		}
		text+="\\end{array}\\right]";
		MathJax.Hub.Queue(["Text",matrix,text]);
	}

	function sizeInputChanges(){
		container.on('change','.rows, .cols',function(){
			n = $(".rows",container).val();
			m = $(".cols",container).val();
			var matrix01 = new Matrix(n,m);
			$("#matrix1").html("");
			createMatrix("#matrix1",n,m);
			updateMatrix("#matrix1",n,m,matrix01.get1D_array());


		});

	}

	function getMatrixFromTable(ele){
		var matrix = [];
		$("input",ele).each(function(){
			matrix.push($(this).val());
		});
		return matrix;
	}

	function Init(){
		var matrix01 = new Matrix(n,m);
		createMatrix("#matrix1",n,m);
		updateMatrix("#matrix1",n,m,matrix01.get1D_array());
		$(".scalarInput",container).val(incNumber);
		$(".rows",container).val(n);
		$(".cols",container).val(m);
	}

	function onButtonPress(){
		container.on('click','.showMatrix', function() {
			var matrix1 = getMatrixFromTable($("#matrix1",container));
			var inc = $(".scalarInput",container).val();

			var tmpMatrix = [];
			for(var i=0;i<matrix1.length;i++){
				tmpMatrix.push(inc+"*"+matrix1[i]);
			}

			var matrix = MathJax.Hub.getAllJax("matrix2")[0];
			MathJax.Hub.Queue(["Text",matrix,matrixToMath(n,m,tmpMatrix)]);

			var matrix = MathJax.Hub.getAllJax("matrix3")[0];
			MathJax.Hub.Queue(["Text",matrix,matrixToMath(n,m,increaseMatrix(matrix1,inc ))]);
		});
	}

	function matrixToMath( n,  m,  matrix){
		var text = "\\left[\\begin{array}{";
		text+=m*"r";
		text+="}";
		var first;
		for(var i=0;i<n;i++){
			first = true;
			for(var j=0;j<m;j++){
				if(!first){
					text+="&";
				}
				var input = matrix[(i*m)+j];
				//text
				text+=input;
				first = false;
			}
			text+="\\\\";
		}
		text+="\\end{array}\\right]";
		return text;
	}

	function increaseMatrix(matrix, val){
		var matrix02 = [];
		for(var i=0;i<matrix.length;i++){
			matrix02.push(matrix[i]*val);
		}
		return matrix02;
	}


	Init();
	sizeInputChanges();
	onButtonPress();
	//InitMathJaxExample();

});