var AboutView = function() {

	this.renderPage = function(){

		this.el.append( this.inner );
		this.inner.html(AboutView.toptemplate());
		this.inner.append( AboutView.sectiontemplate() );

		return this;
	};

	this.initialize = function() {
    // Define a div wrapper for the view. The div wrapper is used to attach events.
    console.log("About Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');
	};

	this.initialize();

};

AboutView.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
AboutView.sectiontemplate = Handlebars.compile($("#about-section-tpl").html());

$(function(){

});
