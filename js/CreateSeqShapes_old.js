var CreateSeqShapes = function(store) {

  this.selector = function(c, e){
    this.count++;

    console.log("CreateSeqShapes Selector Called " + this.count);

    var self= this;

    if( c == "shape" ){
      if( $( e.target ).attr('data-select') == "false" ){
    	     console.log( "from inside add" + $( e.target ).attr('data-select'));
           self.addshapes[self.i] = $( e.target ).attr('data-val');
           $( e.target ).attr('data-select', "true");
           $( e.target ).addClass("selected");
           self.i++;
        } else {
          console.log( "from inside remove" + $( e.target ).attr('data-select'));
            $( e.target ).attr('data-select', "false");
            $( e.target ).removeClass("selected");
            self.shape_remove = $( e.target ).attr('data-val');
            self.shape_del = self.addshapes.indexOf( self.shape_remove );
            self.addshapes.splice(self.shape_del, 1);
            self.i--;
        }
    }

    if( c == "color" ){
      if( $( e.target ).attr('data-select') == "false" ){
        self.addcolors[self.c] = $( e.target ).attr('data-val');
            $( e.target ).attr('data-select', "true");
            $( e.target ).addClass("selected");
            self.c++;
        } else {
            $( e.target ).attr('data-select', "false");
            $( e.target ).removeClass("selected");
            self.color_remove = $( e.target ).attr('data-val');
            self.color_del = self.addcolors.indexOf( self.color_remove );
            self.addcolors.splice(self.color_del, 1);
            self.c--;
        }
    }

  };

  this.submission = function(){

    var self = this;

		console.log( this.addshapes );
		console.log( this.addcolors );

		if( this.addshapes.length == 0 || this.addcolors.length == 0 ){
			//Arrays are empty - no bueno
			app.showAlert("Please select shapes and colors before continuing", "Error");
		} else {
      //Do something with the arrays and sent to time view
      var presets = JSON.parse(window.localStorage.getItem("presets"));
      var count = presets.length;

      var new_preset = {"id": count + 1,
                        "preset_name":"Temp",
                        "preset_shapes":self.addshapes,
                        "preset_colors":self.addcolors,
                        "preset_total_time":"0",
                        "preset_image_time":"0",
                        "preset_down_time":"0"
                        };

      $('.shape-select').each(function(){
        $( this ).attr('data-select', "false");
      });
      $('.color-select').each(function(){
        $( this ).attr('data-select', "false");
      });

      store.createTempPreset( new_preset, function(answer){
        if( answer ){
          self.el = '';
          location.hash = "#CST";
        } else {
          app.showAlert("Error creating new preset", "Sorry!");
        }
      });

		}

  };

	this.renderPage = function(){

		this.el.append( this.inner );
		this.inner.html(CreateSeqShapes.toptemplate());
		this.inner.append( CreateSeqShapes.sectiontemplate() );

    console.log( this );
    console.log( this.addshapes + this.addcolors + this.i + this.c + this.shape_remove + this.shape_del + this.color_remove + this.color_del );

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
    this.i = 0;
    this.c = 0;
    this.shape_remove;
    this.shape_del;
    this.color_remove;
    this.color_del;
    this.count = 0;
  };

	this.initialize();

  var self = this;

  $('body').on('mouseup touchend', '.shape-select',function(e){
    self.selector('shape', e);
  });
  $('body').on('mouseup touchend', '.color-select',function(e){
    self.selector('color', e);
  });
  $('body').on('mouseup touchend', '.check-selection-1',function(e){
    self.submission();
  });

};

CreateSeqShapes.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
CreateSeqShapes.sectiontemplate = Handlebars.compile($("#css-section-tpl").html());

$(function(){


});
