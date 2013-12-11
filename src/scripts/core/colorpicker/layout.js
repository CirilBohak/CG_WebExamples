(function($){
	var initLayout = function() {
		
		$('#colorpickerHolder').ColorPicker({
			flat: true,
			color: '#00ff00',		
			onSubmit: function(hsb, hex, rgb) {
				drawDots(rgb);											
				showFormula(rgb);
			}
		});
	};
	
	EYE.register(initLayout, 'init');
})(jQuery)
