var SequenceView = function() {

	this.renderPage = function(){

		this.el.append( this.inner );
		//this.inner.html(SequenceView.toptemplate());
		this.inner.html( SequenceView.sectiontemplate() );

		return this;
	};

	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("SequenceView Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');

    //this.chosenpreset = JSON.parse(window.localStorage.getItem("chosenpreset"));
    //console.log(this.chosenpreset);
	};

	this.initialize();

};

SequenceView.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
SequenceView.sectiontemplate = Handlebars.compile($("#sequence-section-tpl").html());

$(function(){

	$('body').on('click', '#sequencer', function(event) {
		app.stopcountdown(app.s, "sequence");
	});

});
