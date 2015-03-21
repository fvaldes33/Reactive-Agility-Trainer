var CreateSeqArrows = function(store) {

	this.renderPage = function(){

		this.el.append( this.inner );
		this.inner.html(CreateSeqArrows.toptemplate());
		this.inner.append( CreateSeqArrows.sectiontemplate() );
		
    return this;
	};

	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("CreateSeqArrows Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');

  };

	this.initialize();

  var self = this;

};

CreateSeqArrows.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
CreateSeqArrows.sectiontemplate = Handlebars.compile($("#csa-section-tpl").html());

$(function(){


});
