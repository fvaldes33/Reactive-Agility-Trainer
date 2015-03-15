var app = {

	slidePage: function(page) {

	},

	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},

	registerEvents: function() {
		var self = this;

		if ('ontouchstart' in document.documentElement) {
		  this.showAlert( "touch start exist");
		} else {
			this.showAlert( "no touches" );
		}

		//this.showAlert( document.documentElement.hasOwnProperty('ontouchstart') );

		if (document.documentElement.hasOwnProperty('ontouchstart')) {
			// ... if yes: register touch event listener to change the "selected" state of the item

			$('body').on('touchstart', 'a', function(event) {
				$(event.target).parent().addClass("tapme");
			});

			$('body').on('touchend', 'a', function(event) {
				$(event.target).parent().removeClass("tapme");
			});

			$('body').on('touchend', '.shape-select', function(e){
				self.showAlert("Color Select");

				if( $(e.target).attr('data-select') == "false" ){
					$( e.target ).addClass("selected");
					$( e.target ).attr("data-select", "true" );
					self.addshapes[self.shape_count] = $( e.target ).attr('data-val');
					self.shape_count++;
				} else {
					$( e.target ).removeClass("selected");
					$( e.target ).attr("data-select", "false" );
					self.shape_remove = $( e.target ).attr('data-val');
					self.shape_del = self.addshapes.indexOf( self.shape_remove );
					self.addshapes.splice(self.shape_del, 1);
					self.shape_count--;
				}

				console.log( self.addshapes );

			});
			$('body').on('touchend', '.color-select',function(e){
				self.showAlert("Color Select");

				if( $(e.target).attr('data-select') == "false" ){
					$( e.target ).addClass("selected");
					$( e.target ).attr("data-select", "true" );
					self.addcolors[self.color_count] = $( e.target ).attr('data-val');
					self.color_count++;
				} else {
					$( e.target ).removeClass("selected");
					$( e.target ).attr("data-select", "false" );
					self.color_remove = $( e.target ).attr('data-val');
					self.color_del = self.addcolors.indexOf( self.color_remove );
					self.addcolors.splice(self.color_del, 1);
					self.color_count--;
				}
				console.log( self.addcolors );
			});

			$('body').on('touchend', '.check-selection-1',function(e){
				console.log(e);

				if( self.addshapes.length == 0 || self.addcolors.length == 0 ){
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

					self.shape_count = 0;
					self.color_count = 0;
					self.addshapes = [];
					self.addcolors = [];

		      self.store.createTempPreset( new_preset, function(answer){
		        if( answer ){
		          self.el = '';
		          location.hash = "#CST";
		        } else {
		          app.showAlert("Error creating new preset", "Sorry!");
		        }
		      });

				}

				$('body').on('touchend', '.changetime', function(e){

		      var action = $( this ).attr('data-action');
		      var inc = $( this ).attr('data-inc');
		      var sendto = $( this ).attr('data-send');

		      if( action == "add" ){
		        self.mousedown = true;
		        self.increment('add', sendto, inc);
		      }else{
		        self.mousedown = true;
		        self.increment('sub', sendto, inc);
		      }

		    });

		    $('body').on('touchend', '.changetime', function(e){

		      self.mousedown = false;

		    });

				$('body').on('touchend', '.complete-selection',function(e){

					console.log( $('.complete-selection').html() );

		      self.total_time = $('#total_time').val();
		      self.flash_time = $('#flash_time').val();
		      self.down_time = $('#down_time').val();

		  		if( self.total_time == 0 || self.flash_time == 0 || self.down_time == 0 ){
		  			//Arrays are empty - no bueno
		  			app.showAlert("Please select times before continuing", "Error");
		  		} else {
		        //Do something with the arrays and sent to time view
		        //location.hash = "#CST";
		        var temp = JSON.parse(window.localStorage.getItem("temp_preset"));
						console.log( temp );

						temp.preset_total_time = self.total_time;
		        temp.preset_image_time = self.flash_time;
		        temp.preset_down_time = self.down_time;

		        self.store.editTempPreset(temp, function(answer){
			        if( answer ){
			            //save
			            self.store.savePreset( temp, function(finish){
			              if( finish ){
			                //Done
			                app.showAlert("Done Saving", "Success!");
			                setTimeout( function(){
												self.total_time = 0;
												self.flash_time = 0;
												self.down_time = 0;

												window.localStorage.removeItem("temp_preset");

			                  location.hash = "#HOME";
			                }, 1000);
			              }else{
			                //Error saving
			                app.showAlert("Error Saving", "Sorry!");
			              }
			            });
			         } else {
			            //error
									app.showAlert("Error Saving", "Sorry!");
			         }
						});
					}
		    });
			});

			$(window).on('hashchange', $.proxy(this.route, this));

		} else {
			// ... if not: register mouse events instead

			$('body').on('mousedown', 'a', function(event) {
				$(event.target).parent().addClass("tapme");
			});

			$('body').on('mouseup', 'a', function(event) {
				$(event.target).parent().removeClass("tapme");
			});

			$('body').on('mouseup', '.shape-select', function(e){
				console.log(e);

				if( $(e.target).attr('data-select') == "false" ){
					$( e.target ).addClass("selected");
					$( e.target ).attr("data-select", "true" );
					self.addshapes[self.shape_count] = $( e.target ).attr('data-val');
					self.shape_count++;
				} else {
					$( e.target ).removeClass("selected");
					$( e.target ).attr("data-select", "false" );
					self.shape_remove = $( e.target ).attr('data-val');
					self.shape_del = self.addshapes.indexOf( self.shape_remove );
					self.addshapes.splice(self.shape_del, 1);
					self.shape_count--;
				}

				console.log( self.addshapes );

			});
			$('body').on('mouseup', '.color-select',function(e){
				console.log(e);

				if( $(e.target).attr('data-select') == "false" ){
					$( e.target ).addClass("selected");
					$( e.target ).attr("data-select", "true" );
					self.addcolors[self.color_count] = $( e.target ).attr('data-val');
					self.color_count++;
				} else {
					$( e.target ).removeClass("selected");
					$( e.target ).attr("data-select", "false" );
					self.color_remove = $( e.target ).attr('data-val');
					self.color_del = self.addcolors.indexOf( self.color_remove );
					self.addcolors.splice(self.color_del, 1);
					self.color_count--;
				}
				console.log( self.addcolors );
			});

			$('body').on('mouseup', '.check-selection-1',function(e){
				console.log(e);

				if( self.addshapes.length == 0 || self.addcolors.length == 0 ){
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

					self.shape_count = 0;
					self.color_count = 0;
					self.addshapes = [];
					self.addcolors = [];

		      self.store.createTempPreset( new_preset, function(answer){
		        if( answer ){
		          self.el = '';
		          location.hash = "#CST";
		        } else {
		          app.showAlert("Error creating new preset", "Sorry!");
		        }
		      });

				}

				$('body').on('mousedown', '.changetime', function(e){

		      var action = $( this ).attr('data-action');
		      var inc = $( this ).attr('data-inc');
		      var sendto = $( this ).attr('data-send');

		      if( action == "add" ){
		        self.mousedown = true;
		        self.increment('add', sendto, inc);
		      }else{
		        self.mousedown = true;
		        self.increment('sub', sendto, inc);
		      }

		    });

		    $('body').on('mouseup', '.changetime', function(e){

		      self.mousedown = false;

		    });

				$('body').on('mouseup', '.complete-selection',function(e){

					console.log( $('.complete-selection').html() );

		      self.total_time = $('#total_time').val();
		      self.flash_time = $('#flash_time').val();
		      self.down_time = $('#down_time').val();

		  		if( self.total_time == 0 || self.flash_time == 0 || self.down_time == 0 ){
		  			//Arrays are empty - no bueno
		  			app.showAlert("Please select times before continuing", "Error");
		  		} else {
		        //Do something with the arrays and sent to time view
		        //location.hash = "#CST";
		        var temp = JSON.parse(window.localStorage.getItem("temp_preset"));
						console.log( temp );

						temp.preset_total_time = self.total_time;
		        temp.preset_image_time = self.flash_time;
		        temp.preset_down_time = self.down_time;

		        self.store.editTempPreset(temp, function(answer){
			        if( answer ){
			            //save
			            self.store.savePreset( temp, function(finish){
			              if( finish ){
			                //Done
			                app.showAlert("Done Saving", "Success!");
			                setTimeout( function(){
												self.total_time = 0;
												self.flash_time = 0;
												self.down_time = 0;

												window.localStorage.removeItem("temp_preset");

			                  location.hash = "#HOME";
			                }, 1000);
			              }else{
			                //Error saving
			                app.showAlert("Error Saving", "Sorry!");
			              }
			            });
			         } else {
			            //error
									app.showAlert("Error Saving", "Sorry!");
			         }
						});
					}
		    });
			});

			$(window).on('hashchange', $.proxy(this.route, this));
		}

	},

	increment: function(act, sendto, inc){
    var self = this;

    if( this.mousedown ){

      if( act == "add" ){
        var curr = $(sendto).val();
        curr = Number(curr) + Number(inc);
        curr = Math.round(curr * 100) / 100;
        $(sendto).val(curr);
      } else {
        var curr = $(sendto).val();

        if( curr > 0 ){
          curr = Number(curr) - Number(inc);
          curr = Math.round(curr * 100) / 100;
          $(sendto).val(curr);
        }

      }

      setTimeout(function(){ self.increment(act, sendto, inc); }, 100);
    }

  },

	route: function() {
		var self = this;
		var hash = window.location.hash;
		var page;

		if (!hash) {
			//this.slider.slidePage(new HomeView().renderPage().el);
		} else if (hash == "#") {
			//$('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-right');
		} else if ( hash == "#HOME" ) {
			this.slider.slidePage(new HomeView().renderPage().el);
		} else if ( hash == "#SETTINGS" ) {
			$('body').html(new SettingsView().renderPage().el);
		} else if ( hash == "#STARTER" ) {
			this.slider.slidePage( new StarterView(this.store).renderPage().el );
		} else if ( hash == "#ABOUT" ) {
			this.slider.slidePage(new AboutView(this.store).renderPage().el);
		} else if ( hash == "#CS1" ) {
			this.slider.slidePage(new CreateSeqOne().renderPage().el);
		} else if ( hash == "#CSS" ) {
			this.slider.slidePage(new CreateSeqShapes(this.store).renderPage().el);
		} else if ( hash == "#CST" ) {
			this.slider.slidePage(new CreateSeqTime(this.store).renderPage().el);
		} else if ( hash == "#SEQ" ) {
			this.slider.slidePage(new SequenceView(this.store).renderPage().el);
			this.countdown();
		}

		this.stopcountdown(this.s, 'all');

		//this.slider.slidePage($(page));

	},

	countdown: function(){
		console.log("Countdown Initiated");

		var self = this;
		var s = 5;
		var cd = setInterval( function(){
			if( s > 0 ) {
				$('#counter').html(s);
				s--;
			} else {
				self.stopcountdown(cd, 'countdown');
			}
		}, 1000);

	},

	stopcountdown: function( interval, action ) {
		console.log("Countdown Stopped");
		clearInterval(interval);

		if( action == 'countdown' ) {
			$('#counter').html("Go!");
			this.startsequence();
		} else if( action == 'sequence' ){
			$('#counter').html("Done");
			setTimeout(function(){
				window.localStorage.removeItem("chosenpreset");
				location.hash = "#STARTER";
			}, 1500);
		}
	},

	startsequence: function(){
		var self = this;
		var seq = JSON.parse(window.localStorage.getItem("chosenpreset"));
		console.log( seq );

		this.t = '';
		this.s = 0;
		this.s_max = seq.preset_total_time;
		this.i = 0;
		this.i_max = seq.preset_image_time;
		this.d = 0;
		this.d_max = seq.preset_image_time;
		this.t = null;
		this.n = 0;
		this.rest = false;
		this.shapes = seq.preset_shapes;

    this.t = setInterval(function(){
        if( self.s >= self.s_max ){
           self.stopcountdown( self.t, 'sequence');
        } else {
            self.s = self.s + 0.10;
						self.s = Math.round(self.s * 100) / 100;

            $('.show').html( self.s );

            if(!self.rest) {
							self.i = self.i + 0.10;
							self.i = Math.round(self.i * 100) / 100;

                if( self.i < self.i_max ){
                    $('#counter').html(self.shapes[self.n]);
                } else if( self.i == self.i_max){
                    $('#counter').html("REST");
										self.n = Math.floor((Math.random() * self.shapes.length));
										self.i = 0;
										self.rest = true;
                }
            } else {
                if( self.d < self.d_max ){
										self.d = self.d + 0.10;
										self.d = Math.round(self.d * 100) / 100;
                } else if( self.d == self.d_max ) {
										self.rest = false;
										self.d = 0;
                }
            }
        }
    }, 100);

	},

	makeUniqueRandom: function(numRandoms){
		if (!this.uniqueRandoms.length) {
        for (var i = 0; i < numRandoms; i++) {
            this.uniqueRandoms.push(i);
        }
    }
    var index = Math.floor(Math.random() * this.uniqueRandoms.length);
    var val = this.uniqueRandoms[index];

    // now remove that value from the array
    this.uniqueRandoms.splice(index, 1);

    return val;

	},

	shapeme: function(str) {

		var result;

		switch(str){
			case "Square":
				result = '<i class="fa fa-square fa-5x"></i>';
				break;
			case "Triangle":
				result = '<i class="fa fa-exclamation-triangle fa-5x"></i>';
				break;
			case "Circle":
				result = '<i class="fa fa-circle fa-5x"></i>';
				break;
			case "Star":
				result = '<i class="fa fa-star fa-5x"></i>';
				break;
		}

		return result;

	},

	initialize: function() {
		var self = this;

		location.hash = "#HOME";

		this.t = '';
		this.s = 0;
		this.s_max = 0;
		this.i = 0;
		this.i_max = 0;
		this.d = 0;
		this.d_max = 0;
		this.t = null;
		this.n = 0;
		this.rest = false;

		this.shape_count = 0;
		this.color_count = 0;
		this.addshapes = [];
		this.addcolors = [];
		this.shape_remove;
		this.shape_del;
		this.color_remove;
		this.color_del;

		this.total_time = 0;
		this.flash_time = 0;
		this.down_time = 0;
		this.mousedown = false;

		this.uniqueRandoms = [];

		this.registerEvents();
		this.slider = new PageSlider($("body"));

		this.store = new LocalStorageStore(function() {
			self.route();
		});

    }

};

app.initialize();

$(function(){

	var menuShow = false;
	$('.right-menu').on('click', function(e){
		e.preventDefault();
		console.log(e);
		$('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-right');
	});

});

/*
|*********************
| * Handlebar Helpers
|*********************
**/

Handlebars.registerHelper("formatMinutes", function(mytime) {
	var result;

	if( mytime > 60 ) {
		result = mytime / 60;
		result = result + " min";
	} else {
		result = mytime + " sec";
	}
  	return result;
});

Handlebars.registerHelper("formatshapes", function(shapes, options) {

	var d = '';
	var o = '';

	for( var i = 0; i < shapes.length; i++ ) {

		switch(shapes[i]) {
			case "Square":
				d = d + '<div class="small-4 columns text-center end"><i class="fa fa-square"></i></div>';
				//o = '<i class="fa fa-square"></i>';
				break;
			case "Circle":
				d = d + '<div class="small-4 columns text-center end"><i class="fa fa-circle"></i></div>';
				//o = '<i class="fa fa-circle"></i>';
				break;
			case "Triangle":
				d = d + '<div class="small-4 columns text-center end"><i class="fa fa-exclamation-triangle"></i></div>';
				//o = '<i class="fa fa-exclamation-triangle"></i>';
				break;
			case "Star":
				d = d + '<div class="small-4 columns text-center end"><i class="fa fa-star"></i></div>';
				//o = '<i class="fa fa-star"></i>';
				break;
		}

	}

	return new Handlebars.SafeString(d);
});
