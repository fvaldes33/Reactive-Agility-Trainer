var CreateSeqOne = function() {

	this.renderPage = function(){

		this.el.append( this.inner );
		this.inner.html(CreateSeqOne.toptemplate());
		this.inner.append( CreateSeqOne.sectiontemplate() );

		return this;
	};

	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("CreateSeqOne Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');

    //this.chosenpreset = JSON.parse(window.localStorage.getItem("chosenpreset"));
    //console.log(this.chosenpreset);
	};

	this.initialize();

};

CreateSeqOne.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
CreateSeqOne.sectiontemplate = Handlebars.compile($("#cs1-section-tpl").html());

$(function(){

});
