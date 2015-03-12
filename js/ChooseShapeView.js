var ChooseShapeView = function(store) {

	this.renderPage = function(){

		this.el.append( this.inner );
		this.inner.html(ChooseShapeView.toptemplate());
		this.inner.append( ChooseShapeView.sectiontemplate() );

		return this;
	};

	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("ChooseShapeView Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');

    //this.chosenpreset = JSON.parse(window.localStorage.getItem("chosenpreset"));
    //console.log(this.chosenpreset);
	};

	this.initialize();

};

ChooseShapeView.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
ChooseShapeView.sectiontemplate = Handlebars.compile($("#csv-section-tpl").html());

$(function(){

});
