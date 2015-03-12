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
		if (document.documentElement.hasOwnProperty('ontouchstart')) {
			// ... if yes: register touch event listener to change the "selected" state of the item

			$('body').on('touchstart', 'a', function(event) {
				$(event.target).parent().addClass("tapme");
			});

			$('body').on('touchend', 'a', function(event) {
				$(event.target).parent().removeClass("tapme");
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

			$(window).on('hashchange', $.proxy(this.route, this));
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
		} else if ( hash == "#CSV" ) {
			this.slider.slidePage(new ChooseShapeView(this.store).renderPage().el);
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

		this.registerEvents();
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

		this.uniqueRandoms = [];

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

	var addme = new Array();
  var i = 0;
  $('body').on('mouseup touchend', '.box',function(e){
    if( $( e.target ).attr('data-select') == "false" ){
          addme[i] = $( e.target ).attr('data-val');
          $( e.target ).attr('data-select', "true");
          $( e.target ).addClass("selected");
          i++;
      } else {
          $( e.target ).attr('data-select', "false");
          $( e.target ).removeClass("selected");
          var remove = $( e.target ).attr('data-val');
          var del = addme.indexOf( remove );
          $('.delete').html( "Delete " + remove );
          addme.splice(del, 1);
          i--;
      }
      //display(addme);
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
