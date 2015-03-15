var SavedSeqView = function(store) {

	this.renderPage = function(){

    var self = this;

		this.el.append( this.inner );
		this.inner.html(SavedSeqView.toptemplate());

    store.getPresets(function(presets){
			console.log(presets);
			self.inner.append( SavedSeqView.sectiontemplate(presets) );
		});

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

SavedSeqView.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
SavedSeqView.sectiontemplate = Handlebars.compile($("#saved-section-tpl").html());

$(function(){


});
