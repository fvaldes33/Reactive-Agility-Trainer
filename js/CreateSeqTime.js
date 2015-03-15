var CreateSeqTime = function(store) {

	this.renderPage = function(){

		this.el.append( this.inner );
		this.inner.html(CreateSeqTime.toptemplate());
		this.inner.append( CreateSeqTime.sectiontemplate() );

    console.log( this.el );

		return this;
	};

	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("CreateSeqTime Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');

	};

	this.initialize();

};

CreateSeqTime.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
CreateSeqTime.sectiontemplate = Handlebars.compile($("#cst-section-tpl").html());

$(function(){

});
