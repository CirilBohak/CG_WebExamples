$(function() {
	$( "#radio_camera" ).buttonset();
	//X-axis y slider
	$( "#ui_xy_slider" ).slider({
		range: "min", value: c_ostalo, min: -800, max: 400
	});
	//X-axis x slider
	$( "#ui_xx_slider" ).slider({
		range: "min", value: c_xx, min: -800, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_xx_amount" ).val( ui.value );
			c_xx = ui.value;
			matrixx[3] = c_xx; 
			updateSettings();
		}
	});
	$("#ui_xx_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_xx_slider").slider("option", "min" ), max_val = $("#ui_xx_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_xx_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		c_xx = Number($(this).val());
		matrixx[3] = c_xx;
		updateSettings();
	});
	//X-axis z slider
	$( "#ui_xz_slider" ).slider({
		range: "min", value: c_ostalo, min: -800, max: 400
	});
	//Y-axis y slider
	$( "#ui_yy_slider" ).slider({
		range: "min", value: c_yy, min: -800, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_yy_amount" ).val( ui.value );
			c_yy = ui.value;
			matrixy[7] = c_yy;
			updateSettings();
		}
	});
	$("#ui_yy_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_yy_slider").slider("option", "min" ), max_val = $("#ui_y_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_yy_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		c_yy = Number($(this).val());
		matrixy[7] = c_yy;
		updateSettings();
	});
	//Y-axis x slider
	$( "#ui_yx_slider" ).slider({
		range: "min", value: c_ostalo, min: -800, max: 400
	});
	//Y-axis z slider
	$( "#ui_yz_slider" ).slider({
		range: "min", value: c_ostalo, min: -800, max: 400
	});
	//Multiple-axis x slider
	$( "#ui_mx_slider" ).slider({
		range: "min", value: c_mx, min: -800, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_mx_amount" ).val( ui.value );
			c_mx = ui.value;
			matrixm[3] = c_mx;
			updateSettings();
		}
	});
	$("#ui_mx_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_mx_slider").slider("option", "min" ), max_val = $("#ui_mx_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_mx_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		c_mx = Number($(this).val());
		matrixm[3] = c_mx;
		updateSettings();
	});
	//Multiple-axis y slider
	$( "#ui_my_slider" ).slider({
		range: "min", value: c_my, min: -800, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_my_amount" ).val( ui.value );
			c_my = ui.value;
			matrixm[7] = c_my;
			updateSettings();
		}
	});
	$("#ui_my_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_my_slider").slider("option", "min" ), max_val = $("#ui_my_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_my_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		c_my = Number($(this).val());
		matrixm[7] = c_my;
		updateSettings();
	});
	//Multiple-axis z slider
	$( "#ui_mz_slider" ).slider({
		range: "min", value: c_mz, min: -800, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_mz_amount" ).val( ui.value );
			c_mz = ui.value;
			matrixm[11] = c_mz;
			updateSettings();
		}
	});
	$("#ui_mz_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_mz_slider").slider("option", "min" ), max_val = $("#ui_mz_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_mz_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		c_mz = Number($(this).val());
		matrixm[11] = c_mz;
		updateSettings();
	});
	//z-axis x slider
	$( "#ui_zx_slider" ).slider({
		range: "min", value: c_ostalo, min: -800, max: 400
	});
	//z-axis y slider
	$( "#ui_zy_slider" ).slider({
		range: "min", value: c_ostalo, min: -800, max: 400
	});
	//z-axis z slider
	$( "#ui_zz_slider" ).slider({
		range: "min", value: c_zz, min: -800, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_zz_amount" ).val( ui.value );
			c_zz = ui.value;
			matrixz[11] = c_zz;
			updateSettings();
		}
	});
	$("#ui_zz_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_zz_slider").slider("option", "min" ), max_val = $("#ui_zz_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_zz_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		c_zz = Number($(this).val());
		matrixz[11] = c_zz;
		updateSettings();
	});
	$( "#tabs_config" ).tabs({
		activate: function(event, ui) {
			index = ui.newTab.index();
			parameters();
		}
	});

	$("input:radio[name='radio']").change(function(){
		saveInformation();
		izbrani = $("input:radio:checked").val();
		checkboxes();
	});
});
function parameters(){
	switch(index){
		case 0:
			$("#ui_xy_slider").slider( "option", "disabled", true );
			$("#ui_xz_slider").slider( "option", "disabled", true );
			$("#ui_xy_amount").prop('disabled', true);
			$("#ui_xz_amount").prop('disabled', true);
			matrixGeneral = matrixx;
			updateMatrix("#matrix1",4,4,matrixGeneral);
			break;
		case 1:
			$("#ui_yx_slider").slider( "option", "disabled", true );
			$("#ui_yz_slider").slider( "option", "disabled", true );
			$("#ui_yx_amount").prop('disabled', true);
			$("#ui_yz_amount").prop('disabled', true);
			matrixGeneral = matrixy;
			updateMatrix("#matrix1",4,4,matrixGeneral);
			break;
		case 2:
			$("#ui_zx_slider").slider( "option", "disabled", true );
			$("#ui_zy_slider").slider( "option", "disabled", true );
			$("#ui_zx_amount").prop('disabled', true);
			$("#ui_zy_amount").prop('disabled', true);
			matrixGeneral = matrixz;
			updateMatrix("#matrix1",4,4,matrixGeneral);
			break;
		case 3:
			matrixGeneral = matrixm;
			updateMatrix("#matrix1",4,4,matrixGeneral);
			break;
	
	}
}

function saveInformation(){
	switch(izbrani){
		case "0":
			//$("#radio1").prop("checked", true).change();
			information.translation.c_xx =c_xx, information.translation.c_yy =c_yy,information.translation.c_zz = c_zz, information.translation.c_mx =c_mx ,information.translation.c_my = c_my,information.translation.c_mz =c_mz;
			console.log(c_xx);
			break;
		case "1":
			information.rotation.c_xx =c_xx, information.rotation.c_yy =c_yy,information.rotation.c_zz = c_zz, information.rotation.c_mx =c_mx ,information.rotation.c_my = c_my,information.rotation.c_mz =c_mz;
			//$("#radio2").prop("checked", true).change();
			console.log(c_xx);
			break;
		case "2":
			//$("#radio3").prop("checked", true).change();
			information.scale.c_xx =c_xx, information.scale.c_yy =c_yy,information.scale.c_zz = c_zz, information.scale.c_mx =c_mx ,information.scale.c_my = c_my,information.scale.c_mz =c_mz;
			console.log(izbrani);
			break;
		case "3":
			//$("#radio4").prop("checked", true).change();
			information.mirror.c_xx =c_xx, information.mirror.c_yy =c_yy,information.mirror.c_zz = c_zz, information.mirror.c_mx =c_mx ,information.mirror.c_my = c_my,information.mirror.c_mz =c_mz;
			console.log(izbrani);
			break;
		case "4":
			//$("#radio5").prop("checked", true).change();
			information.shear.c_xx =c_xx, information.shear.c_yy =c_yy,information.shear.c_zz = c_zz, information.shear.c_mx =c_mx ,information.shear.c_my = c_my,information.shear.c_mz =c_mz;
			console.log(izbrani);
			break;
	}
	object.position.x = 1;
	object.position.y = 0;
	object.position.z = 0;
	object.scale.y = 1;
	object.scale.z = 1;
	object.scale.x = 1;

}
function checkboxes(){
	switch(izbrani){
		case "0":
			//$("#radio1").prop("checked", true).change();
			c_xx= information.translation.c_xx, c_yy= information.translation.c_yy, c_zz= information.translation.c_zz, c_mx= information.translation.c_mx , c_my= information.translation.c_my, c_mz= information.translation.c_mz;
			break;
		case "1":
			c_xx= information.rotation.c_xx, c_yy= information.rotation.c_yy, c_zz= information.rotation.c_zz, c_mx= information.rotation.c_mx , c_my= information.rotation.c_my, c_mz= information.rotation.c_mz;
			//$("#radio2").prop("checked", true).change();
			break;
		case "2":
			//$("#radio3").prop("checked", true).change();
			c_xx= information.scale.c_xx, c_yy= information.scale.c_yy, c_zz= information.scale.c_zz, c_mx= information.scale.c_mx , c_my= information.scale.c_my, c_mz= information.scale.c_mz;
			break;
		case "3":
			//$("#radio4").prop("checked", true).change();
			c_xx= information.mirror.c_xx, c_yy= information.mirror.c_yy, c_zz= information.mirror.c_zz, c_mx= information.mirror.c_mx , c_my= information.mirror.c_my, c_mz= information.mirror.c_mz;
			break;
		case "4":
			//$("#radio5").prop("checked", true).change();
			c_xx= information.shear.c_xx, c_yy= information.shear.c_yy, c_zz= information.shear.c_zz, c_mx= information.shear.c_mx , c_my= information.shear.c_my, c_mz= information.shear.c_mz;
			break;
	}
	$("#ui_xx_slider").slider("value",c_xx);
	$("#ui_yy_slider").slider("value",c_yy);
	$("#ui_zz_slider").slider("value",c_zz);
	$("#ui_mx_slider").slider("value",c_mx);
	$("#ui_my_slider").slider("value",c_my);
	$("#ui_mz_slider").slider("value",c_mz);
	$( "#ui_xx_amount" ).val( c_xx );
	$( "#ui_yy_amount" ).val( c_yy );
	$( "#ui_zz_amount" ).val( c_zz );
	$( "#ui_mx_amount" ).val( c_mx );
	$( "#ui_my_amount" ).val( c_my );
	$( "#ui_mz_amount" ).val( c_mz );
	matrixx[3] = c_xx;
	matrixy[7] = c_yy;
	matrixz[11] = c_zz;
	matrixm[3] = c_mx;
	matrixm[7] = c_my;
	matrixm[11] = c_mz;
	parameters();
}