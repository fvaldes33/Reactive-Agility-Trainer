var StarterView = function(store) {

	this.fillSettings = function(){
		var self = this;

		store.fillSettings($('#sequence_chosen').val(), function(settings) {
			console.log(settings);
			$('.setting-holder').html( StarterView.settingstemplate(settings) );
		});

		$('#btn-row').css('display','block');

	};

	this.renderPage = function(){
		var self = this;

		this.el.append( this.inner );
		this.inner.html(StarterView.toptemplate());

		store.getPresets(function(presets){
			console.log(presets);
			self.inner.append( StarterView.sectiontemplate(presets) );
		});

		return this;
	};

	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("StarterView Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');
		this.inner.on('change', '#sequence_chosen', this.fillSettings);
	};

	this.initialize();

};

StarterView.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
StarterView.sectiontemplate = Handlebars.compile($("#starter-section-tpl").html());
StarterView.settingstemplate = Handlebars.compile($("#starter-setting-tpl").html());


$(function(){

});
