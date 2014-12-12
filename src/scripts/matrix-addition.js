

$(function(){
	var container = $(".matrixAddition");
	var n = Math.floor(Math.random() * 5) + 2, m = Math.floor(Math.random() * 5) + 2;
	$(".rows",container).val(n);
	$(".cols",container).val(m);
	function exampleInit() {
		n=$(".rows",container).val();
		m=$(".cols",container).val();
		var matrix01 = new Matrix(n,m);
		var matrix01Array = matrix01.get1D_array();
		$("#matrix01").html("");
		createMatrix("#matrix01",n,m, false);
		updateMatrix("#matrix01",n,m,matrix01Array);

		var matrix02 = new Matrix(n,m);
		var matrix02Array = matrix02.get1D_array();
		$("#matrix02").html("");
		createMatrix("#matrix02",n,m, false);
		updateMatrix("#matrix02",n,m,matrix02Array);

		for(var i=0;i<matrix01Array.length;i++){
			matrix02Array[i]+=matrix01Array[i];
		}
		$("#matrix03").html("");
		createMatrixStatic("#matrix03",n,m,matrix02Array);

	}

	function bindEvents(){
		container.on('change keyup','.wrapper input',function() {
			$("#matrix01 input.changes").removeClass("changes");
			$("#matrix02 input.changes").removeClass("changes");
			$("#matrix03 input.changes").removeClass("changes");
			var matrix1 = getMatrixFromTable($("#matrix01",container));
			var matrix2 = getMatrixFromTable($("#matrix02",container));
			for(var i=0;i<matrix1.length;i++){
				matrix2[i]+=matrix1[i];
			}
			$("#matrix03").html("");
			createMatrixStatic("#matrix03",n,m,matrix2);
			if($(this).hasClass("vecInputCol") ){


				var data = $(this).parent().attr('class');
				$("#matrix01").find("."+data+" input").addClass("changes");
				$("#matrix02").find("."+data+" input").addClass("changes");
				$("#matrix03").find("."+data+" input").addClass("changes");

			}
		});

		container.on('change','.inputs',function() {
			exampleInit()
		});
	}

	function getMatrixFromTable(ele){
		var matrix = [];
		$("input",ele).each(function(){
			matrix.push(parseInt($(this).val()));
		});
		return matrix;
	}
	exampleInit();
	bindEvents();
});