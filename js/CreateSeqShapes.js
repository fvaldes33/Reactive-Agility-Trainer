var CreateSeqShapes = function(store) {

  this.selector = function(){

    var i = 0;
    var c = 0;
    var self= this;

    $('body').on('mouseup touchend', '.shape-select',function(e){
      if( $( e.target ).attr('data-select') == "false" ){
  	     self.addshapes[i] = $( e.target ).attr('data-val');
         $( e.target ).attr('data-select', "true");
         $( e.target ).addClass("selected");
         i++;
      } else {
          $( e.target ).attr('data-select', "false");
          $( e.target ).removeClass("selected");
          var remove = $( e.target ).attr('data-val');
          var del = self.addshapes.indexOf( remove );
  				self.addshapes.splice(del, 1);
          i--;
        }
    });

    $('body').on('mouseup touchend', '.color-select',function(e){
      if( $( e.target ).attr('data-select') == "false" ){
  					self.addcolors[c] = $( e.target ).attr('data-val');
            $( e.target ).attr('data-select', "true");
            $( e.target ).addClass("selected");
            c++;
        } else {
            $( e.target ).attr('data-select', "false");
            $( e.target ).removeClass("selected");
            var remove = $( e.target ).attr('data-val');
            var del = self.addcolors.indexOf( remove );
            $('.delete').html( "Delete " + remove );
  					self.addcolors.splice(del, 1);
            c--;
        }
    });

  };

  this.submission = function(){
    var self = this;

    $('body').on('mouseup touchend', '#check-selection-1',function(e){
  		console.log( self.addshapes );
  		console.log( self.addcolors );

  		if( self.addshapes.length == 0 || self.addcolors.length == 0 ){
  			//Arrays are empty - no bueno
  			app.showAlert("Please select shapes and colors before continuing", "Error");
  		} else {
        //Do something with the arrays and sent to time view
        location.hash = "#CST";
  		}

    });

  };

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

    this.addshapes = new Array();
    this.addcolors = new Array();

    this.selector();
    this.submission();

	};

	this.initialize();

};

CreateSeqShapes.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
CreateSeqShapes.sectiontemplate = Handlebars.compile($("#css-section-tpl").html());

$(function(){

});
