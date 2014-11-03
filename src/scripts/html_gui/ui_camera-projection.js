/*****************************
      jQueryui functions
******************************/
var oldRx = 0, oldRy = 0, oldRz = 0;

$(function() {
	var persp_camera = $(".persp_camera"), ortho_camera = $(".ortho_camera");
	persp_camera.hide();
	
	
	$( "#pX input" ).val( c_Orto.position.x ); $( "#pY input" ).val( c_Orto.position.y ); $( "#pZ input" ).val( c_Orto.position.z );
	$( "#pX input" ).change(function() { c_Pers.position.x = c_Orto.position.x = $(this).val(); }); $( "#pY input" ).change(function() { c_Pers.position.y = c_Orto.position.y = $(this).val(); }); $( "#pZ input" ).change(function() { c_Pers.position.z = c_Orto.position.z = $(this).val(); });
	$( "#pX input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#pY input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#pZ input" ).tooltip({ offset: [0, 2], effect: 'slide'});
	
	$( "#rX input" ).change(function() { 
		resetCamera(c_Orto);
		c_Orto.rotateY(degree_to_rad($("#rY input").val()));
		c_Orto.rotateX(degree_to_rad($(this).val()));
		c_Orto.rotateZ(degree_to_rad($("#rZ input").val())); 
		
		resetCamera(c_Pers);
		c_Pers.rotateY(degree_to_rad($("#rY input").val()));
		c_Pers.rotateX(degree_to_rad($(this).val()));
		c_Pers.rotateZ(degree_to_rad($("#rZ input").val()));
	});
	$( "#rY input" ).change(function() {
		resetCamera(c_Orto);
		c_Orto.rotateY(degree_to_rad($(this).val()));
		c_Orto.rotateX(degree_to_rad($("#rX input").val()));
		c_Orto.rotateZ(degree_to_rad($("#rZ input").val())); 
		
		resetCamera(c_Pers);
		c_Pers.rotateY(degree_to_rad($(this).val()));
		c_Pers.rotateX(degree_to_rad($("#rX input").val()));
		c_Pers.rotateZ(degree_to_rad($("#rZ input").val())); 
	}); 
	$( "#rZ input" ).change(function() {
		resetCamera(c_Orto);
		c_Orto.rotateY(degree_to_rad($("#rY input").val()));
		c_Orto.rotateX(degree_to_rad($("#rX input").val()));
		c_Orto.rotateZ(degree_to_rad($(this).val()));  
		
		resetCamera(c_Pers);
		c_Pers.rotateY(degree_to_rad($("#rY input").val()));
		c_Pers.rotateX(degree_to_rad($("#rX input").val()));
		c_Pers.rotateZ(degree_to_rad($(this).val()));  
	});
	
	$( "#rX input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#rY input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#rZ input" ).tooltip({ offset: [0, 2], effect: 'slide'});
	
	$( "#radio_camera" ).buttonset();
	$( "#radio_camera :radio" ).click(function(event){
		switch($(this).index()*0.5){
			case 0: 
				if(whichCamera){ 
					toogle_camera();
					$("#ui_right_slider").slider( "option", "disabled", true );
					$("#ui_bottom_slider").slider( "option", "disabled", true );
					$("#ui_right_amount").prop('disabled', true);
					$("#ui_bottom_amount").prop('disabled', true);
					
					c_fov = THREE.Math.radToDeg(2*Math.atan(c_top/c_near));
					$( "#ui_fov_slider" ).slider( "value",  precise_round(c_fov,2)); $( "#ui_fov_amount" ).val(precise_round(c_fov,2));
					c_aspect = (c_right-c_left)/(c_top-c_bottom);
					$( "#ui_aspect_slider" ).slider( "value",  precise_round(c_aspect,2)); $( "#ui_aspect_amount" ).val(precise_round(c_aspect,2));
					
					updateCamera(); persp_camera.show(); ortho_camera.hide();  
				} 
				break;
			case 1: 
				if(!whichCamera){ 
					toogle_camera(); updateCamera(); persp_camera.hide(); ortho_camera.show();
					$("#ui_right_slider").slider( "option", "disabled", false );
					$("#ui_bottom_slider").slider( "option", "disabled", false );
					$("#ui_right_amount").prop('disabled', false);
					$("#ui_bottom_amount").prop('disabled', false);
				} 
				break;
			default: break;
		}
	});
	
	$( "#tabs_config" ).tabs({
		activate: function(event, ui) {
			var index = ui.newTab.index();
			
			switch(index){
				case 0: c_auto = false; 
					var c_w2 = c_width*0.5; c_left=-c_w2; c_right = c_w2, c_h2 = c_height*0.5; c_bottom=-c_h2; c_top = c_h2;
					
					updateCamera(); 
					
					$( "#ui_aspect_slider" ).slider( "value",  precise_round(c_aspect,2)); $( "#ui_aspect_amount" ).val(precise_round(c_aspect,2));
					$( "#ui_fov_slider" ).slider( "value",  precise_round(c_fov,2)); $( "#ui_fov_amount" ).val(precise_round(c_fov,2));
					break;
				case 1: 
					c_auto = true;
					c_width = Math.abs(Math.min(-c_left, c_right)*2);
					c_height = Math.abs(Math.min(-c_bottom, c_top)*2);
					
					c_top = c_height*0.5; c_bottom = -c_top; c_left = c_width*0.5; c_right = -c_left;
					
					updateCamera(); 
					
					$( "#ui_width_slider" ).slider( "value",  Math.round(c_width)); $( "#ui_width_amount" ).val( Math.round(c_width) );
					$( "#ui_height_slider" ).slider( "value",  Math.round(c_height)); $( "#ui_height_amount" ).val( Math.round(c_height) );
					break;
				default: console.log('you need to update $("#tabs_config") activate!!!');
			}
			
			$( "#ui_left_slider" ).slider( "value",  Math.round(c_left)); $( "#ui_left_amount" ).val(Math.round(c_left));
			$( "#ui_right_slider" ).slider( "value",  Math.round(c_right)); $( "#ui_right_amount" ).val(Math.round(c_right));
			$( "#ui_bottom_slider" ).slider( "value",  Math.round(c_bottom)); $( "#ui_bottom_amount" ).val(Math.round(c_bottom));
			$( "#ui_top_slider" ).slider( "value",  Math.round(c_top)); $( "#ui_top_amount" ).val(Math.round(c_top));
		}
	});
	
	/*Make matrix tool-tip's*/
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			var tmp=$( "#matrix1_inner .m"+i+""+j+" input" );
			tmp.tooltip({ offset: [0, 2], effect: 'slide'});
			tmp.attr('readonly', true);
		}
	}
	
	/************
		WIDTH
	*************/
	$( "#ui_width_slider" ).slider({
		range: "min", value: c_width, min: 1, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_width_amount" ).val( ui.value ); c_width = ui.value; 
			
			c_left = c_width*0.5;
			c_right = -c_left;
			
			updateCamera(); 
		}
	}); $( "#ui_width_slider > a" ).removeAttr("href");
	$( "#ui_width_amount" ).val( $( "#ui_width_slider" ).slider( "value" ) );
	
	$("#ui_width_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_width_slider").slider("option", "min" ), max_val = $("#ui_width_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_width_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_width = Number($(this).val()); 
		
		c_left = c_width*0.5;
		c_right = -c_left;
		
		updateCamera();
	});
	
	/************
		HEIGHT
	*************/
	$( "#ui_height_slider" ).slider({
		range: "min", value: c_height, min: 1, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_height_amount" ).val( ui.value ); c_height = ui.value; 
			
			c_top = c_height*0.5;
			c_bottom = -c_top;
			
			updateCamera(); 
		}
	}); $( "#ui_height_slider > a" ).removeAttr("href");
	$( "#ui_height_amount" ).val( $( "#ui_height_slider" ).slider( "value" ) );
	
	$("#ui_height_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_height_slider").slider("option", "min" ), max_val = $("#ui_height_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_height_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_height = Number($(this).val());
		
		c_top = c_height*0.5;
		c_bottom = -c_top;

		updateCamera();
	});
	
	/************
		LEFT
	*************/
	$( "#ui_left_slider" ).slider({
		range: "min", value: c_left, min: -300, max: 1,
		slide: function( event, ui ) { 
			$( "#ui_left_amount" ).val( ui.value ); c_left = ui.value; 
			
			if(!whichCamera){ 
				c_right = -c_left;
				$( "#ui_right_slider" ).slider( "value",  Math.round(c_right)); $( "#ui_right_amount" ).val(Math.round(c_right));
				
				c_aspect = (c_right-c_left)/(c_top-c_bottom);
				$( "#ui_aspect_slider" ).slider( "value",  precise_round(c_aspect,2)); $( "#ui_aspect_amount" ).val(precise_round(c_aspect,2));
			}
			
			updateCamera(); 
		}
	}); $( "#ui_left_slider > a" ).removeAttr("href");
	$( "#ui_left_amount" ).val( $( "#ui_left_slider" ).slider( "value" ) );
	
	$("#ui_left_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_left_slider").slider("option", "min" ), max_val = $("#ui_left_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_left_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_left = Number($(this).val()); 
		
		if(!whichCamera){ 
			c_right = -c_left;
			$( "#ui_right_slider" ).slider( "value",  Math.round(c_right)); $( "#ui_right_amount" ).val(Math.round(c_right));
			
			c_aspect = (c_right-c_left)/(c_top-c_bottom);
			$( "#ui_aspect_slider" ).slider( "value",  precise_round(c_aspect,2)); $( "#ui_aspect_amount" ).val(precise_round(c_aspect,2));
		}
		
		updateCamera();
	});
	
	/************
		RIGHT
	*************/
	$( "#ui_right_slider" ).slider({
		range: "min", value: c_right, min: 1, max: 300,
		slide: function( event, ui ) { $( "#ui_right_amount" ).val( ui.value ); c_right = ui.value; updateCamera(); }
	}); $( "#ui_right_slider > a" ).removeAttr("href");
	$( "#ui_right_amount" ).val( $( "#ui_right_slider" ).slider( "value" ) );
	
	$("#ui_right_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_right_slider").slider("option", "min" ), max_val = $("#ui_right_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_right_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_right = Number($(this).val()); updateCamera();
	});
	
	/************
		TOP
	*************/
	$( "#ui_top_slider" ).slider({
		range: "min", value: c_top, min: 1, max: 300,
		slide: function( event, ui ) { 
			$( "#ui_top_amount" ).val( ui.value ); c_top = ui.value; 
			
			if(!whichCamera){ 
				c_bottom = -c_top;
				$( "#ui_bottom_slider" ).slider( "value",  Math.round(c_bottom)); $( "#ui_bottom_amount" ).val(Math.round(c_bottom));
				
				c_fov = THREE.Math.radToDeg(2*Math.atan(c_top/c_near));
				$( "#ui_fov_slider" ).slider( "value",  precise_round(c_fov,2)); $( "#ui_fov_amount" ).val(precise_round(c_fov,2));
				c_aspect = (c_right-c_left)/(c_top-c_bottom);
				$( "#ui_aspect_slider" ).slider( "value",  precise_round(c_aspect,2)); $( "#ui_aspect_amount" ).val(precise_round(c_aspect,2));
			}
			
			updateCamera(); 
		}
	}); $( "#ui_top_slider > a" ).removeAttr("href");
	$( "#ui_top_amount" ).val( $( "#ui_top_slider" ).slider( "value" ) );
	
	$("#ui_top_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_top_slider").slider("option", "min" ), max_val = $("#ui_top_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_top_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_top = Number($(this).val()); 
		
		if(!whichCamera){ 
			c_bottom = -c_top;
			$( "#ui_bottom_slider" ).slider( "value",  Math.round(c_bottom)); $( "#ui_bottom_amount" ).val(Math.round(c_bottom));
			
			c_fov = THREE.Math.radToDeg(2*Math.atan(c_top/c_near));
			$( "#ui_fov_slider" ).slider( "value",  precise_round(c_fov,2)); $( "#ui_fov_amount" ).val(precise_round(c_fov,2));
			c_aspect = (c_right-c_left)/(c_top-c_bottom);
			$( "#ui_aspect_slider" ).slider( "value",  precise_round(c_aspect,2)); $( "#ui_aspect_amount" ).val(precise_round(c_aspect,2));
		}
		
		updateCamera();
	});
	
	/************
		BOTTOM
	*************/
	$( "#ui_bottom_slider" ).slider({
		range: "min", value: c_bottom, min: -300, max: 1,
		slide: function( event, ui ) { $( "#ui_bottom_amount" ).val( ui.value ); c_bottom = ui.value; updateCamera(); }
	}); $( "#ui_bottom_slider > a" ).removeAttr("href");
	$( "#ui_bottom_amount" ).val( $( "#ui_bottom_slider" ).slider( "value" ) );
	
	$("#ui_bottom_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_bottom_slider").slider("option", "min" ), max_val = $("#ui_bottom_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_bottom_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_bottom = Number($(this).val()); updateCamera();
	});
	
	/************
		NEAR
	*************/
	$( "#ui_near_slider" ).slider({
		range: "min", value: c_near, min: 1, max: 800,
		slide: function( event, ui ) { 
			if(ui.value > c_far){ 
				$(this).slider("value",c_far);
				$( "#ui_near_amount" ).val( c_far );
				
				c_near = c_far-0.001; updateCamera(); 
				return false;
			}else if(ui.value == c_far) return false;
			else{
				$( "#ui_near_amount" ).val( ui.value );
				
				c_near = ui.value; updateCamera(); 
			}
		}
	}); $( "#ui_near_slider > a" ).removeAttr("href");
	$( "#ui_near_amount" ).val( $( "#ui_near_slider" ).slider( "value" ) );
	
	$('#ui_near_amount').bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_near_slider").slider("option", "min" ), max_val = $("#ui_near_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val){ 
				$("#ui_near_slider").slider("value",curr_val);
			}else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_near = Number($(this).val()); updateCamera();
	});
	
	/************
		FAR
	*************/
	$( "#ui_far_slider" ).slider({
		range: "min", value: c_far, min: 1, max: 800,
		slide: function( event, ui ) { 
			if(ui.value < c_near){ 
				$(this).slider("value",c_near);
				$( "#ui_far_amount" ).val( c_near );
				
				c_far = c_near+0.001; updateCamera(); 
				return false;
			}else if(ui.value == c_near) return false;
			else{ 
				$( "#ui_far_amount" ).val( ui.value );
				
				c_far = ui.value; updateCamera(); 
			}
		}
	}); $( "#ui_far_slider > a" ).removeAttr("href");
	$( "#ui_far_amount" ).val( $( "#ui_far_slider" ).slider( "value" ) );
	
	$('#ui_far_amount').bind('input', function(){ 
		var curr_val = $(this).val();
		var min_val = $('#ui_near_amount').val(), max_val = $("#ui_far_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_far_slider").slider('value',curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_far = Number($(this).val()); updateCamera();
	});
	
	/************
		 FOV
	*************/
	$( "#ui_fov_slider" ).slider({
		range: "min", value: c_fov, min: 1, max: 70, step: 0.01,
		slide: function( event, ui ) { 
			$( "#ui_fov_amount" ).val( ui.value ); c_fov = ui.value; 
			
			c_top = c_near * Math.tan( THREE.Math.degToRad( c_fov * 0.5 ));
			c_bottom = -c_top;
			c_left = c_bottom*c_aspect;
			c_right = c_top*c_aspect;
			
			$( "#ui_top_slider" ).slider( "value",  Math.round(c_top)); $( "#ui_top_amount" ).val(Math.round(c_top));
			$( "#ui_bottom_slider" ).slider( "value",  Math.round(c_bottom)); $( "#ui_bottom_amount" ).val(Math.round(c_bottom));
			$( "#ui_left_slider" ).slider( "value",  Math.round(c_left)); $( "#ui_left_amount" ).val(Math.round(c_left));
			$( "#ui_right_slider" ).slider( "value",  Math.round(c_right)); $( "#ui_right_amount" ).val(Math.round(c_right));
			
			updateCamera(); 
		}
	}); $( "#ui_fov_slider > a" ).removeAttr("href");
	$( "#ui_fov_amount" ).val( $( "#ui_fov_slider" ).slider( "value" ) );
	
	$('#ui_fov_amount').bind('input', function(){ 
		var curr_val = $(this).val();
		var min_val = $("#ui_fov_slider").slider("option", "min" ), max_val = $("#ui_fov_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_fov_slider").slider('value',curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_fov = Number($(this).val());
		c_top = c_near * Math.tan( THREE.Math.degToRad( c_fov * 0.5 ));
		c_bottom = -c_top;
		c_left = c_bottom*c_aspect;
		c_right = c_top*c_aspect;
		
		$( "#ui_top_slider" ).slider( "value",  Math.round(c_top)); $( "#ui_top_amount" ).val(Math.round(c_top));
		$( "#ui_bottom_slider" ).slider( "value",  Math.round(c_bottom)); $( "#ui_bottom_amount" ).val(Math.round(c_bottom));
		$( "#ui_left_slider" ).slider( "value",  Math.round(c_left)); $( "#ui_left_amount" ).val(Math.round(c_left));
		$( "#ui_right_slider" ).slider( "value",  Math.round(c_right)); $( "#ui_right_amount" ).val(Math.round(c_right));
					
		updateCamera();
	});
	
	/************
		ASPECT
	*************/
	$( "#ui_aspect_slider" ).slider({
		range: "min", value: c_aspect, min: 0.01, max: 6, step: 0.01,
		slide: function( event, ui ) { 
			$( "#ui_aspect_amount" ).val( ui.value ); c_aspect = ui.value; 
			
			c_left = c_bottom*c_aspect;
			c_right = c_top*c_aspect;
			$( "#ui_left_slider" ).slider( "value",  Math.round(c_left)); $( "#ui_left_amount" ).val(Math.round(c_left));
			$( "#ui_right_slider" ).slider( "value",  Math.round(c_right)); $( "#ui_right_amount" ).val(Math.round(c_right));
			
			updateCamera(); 
		}
	}); $( "#ui_aspect_slider > a" ).removeAttr("href");
	$( "#ui_aspect_amount" ).val( $( "#ui_aspect_slider" ).slider( "value" ) );
	
	$('#ui_aspect_amount').bind('input', function(){ 
		var curr_val = $(this).val();
		var min_val = $("#ui_aspect_slider").slider("option", "min" ), max_val = $("#ui_aspect_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_aspect_slider").slider('value',curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_aspect = Number($(this).val());
		
		c_left = c_bottom*c_aspect;
		c_right = c_top*c_aspect;
		$( "#ui_left_slider" ).slider( "value",  Math.round(c_left)); $( "#ui_left_amount" ).val(Math.round(c_left));
		$( "#ui_right_slider" ).slider( "value",  Math.round(c_right)); $( "#ui_right_amount" ).val(Math.round(c_right));
		
		updateCamera();
	});
});