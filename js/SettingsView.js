var SettingsView = function() {
	
	this.renderPage = function(){
	
		this.el.append( this.inner );
		this.inner.html(SettingsView.toptemplate());
		this.inner.append( SettingsView.sectiontemplate() );

		return this;
	};
	
	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("Settings View Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');
	};

	this.initialize();
	
};

SettingsView.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
SettingsView.sectiontemplate = Handlebars.compile($("#settings-section-tpl").html());

$(function(){
	
});