var CreateSeqShapes = function(store) {

	this.renderPage = function(){

		this.el.append( this.inner );
		this.inner.html(CreateSeqShapes.toptemplate());
		this.inner.append( CreateSeqShapes.sectiontemplate() );

    return this;
	};

	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("CreateSeqShapes Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');

  };

	this.initialize();

  var self = this;

};

CreateSeqShapes.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
CreateSeqShapes.sectiontemplate = Handlebars.compile($("#css-section-tpl").html());

$(function(){


});
