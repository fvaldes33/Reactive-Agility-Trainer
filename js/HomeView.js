var HomeView = function() {
	
	this.renderPage = function(){
	
		this.el.append( this.inner );
		this.inner.html(HomeView.toptemplate());
		this.inner.append( HomeView.sectiontemplate() );
		
		return this;
	};
	
	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("Home Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');
	};

	this.initialize();
	
};

HomeView.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
HomeView.sectiontemplate = Handlebars.compile($("#home-section-tpl").html());

$(function(){

});