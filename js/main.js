var app = {

	registerEvents: function() {
		var self = this;
		if (document.documentElement.hasOwnProperty('ontouchstart')) {
			// ... if yes: register touch event listener to change the "selected" state of the item
			$('body').on('touchstart', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('touchend', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});

			$(window).on('hashchange', $.proxy(this.route, this));

		} else {
			// ... if not: register mouse events instead
			$('body').on('mousedown', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('mouseup', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});

			$(window).on('hashchange', $.proxy(this.route, this));
		}

	},

	route: function() {
		var self = this;
		var hash = window.location.hash;

		if (!hash) {
			$('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-right');
		} else if ( hash == "#HOME" ) {
			$('body').html(new HomeView().renderPage().el);
		} else if ( hash == "#SETTINGS" ) {
			$('body').html(new SettingsView().renderPage().el);
		} else if ( hash == "#STARTER" ) {
			$('body').html(new StarterView(this.store).renderPage().el);
		} else if ( hash == "#ABOUT" ) {
			$('body').html(new AboutView(this.store).renderPage().el);
		} else if ( hash == "#SEQ" ) {
			$('body').html(new SequenceView(this.store).renderPage().el);
			this.countdown();
		}

		this.stopcountdown(this.s, 'all');

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
				location.hash = "#STARTER";
			}, 1500);
		}
	},

	startsequence: function(){
		var self = this;
		var seq = JSON.parse(window.localStorage.getItem("chosenpreset"));
		console.log( seq );

		var total_time = Number(seq.preset_total_time) + Number(seq.preset_image_time);
		var image_time = seq.preset_image_time;
		var down_time = seq.preset_down_time;
		var image_time_keep = 1;
		var show = true;

		this.s = setInterval(function(){
			if( total_time >	 0 ) {

				if( image_time_keep == 1 ) {
					show = true;
				} else if ( image_time_keep == image_time ){
					show = false;
					image_time_keep = 0;
				} else {
					show = false;
				}

				if( show ) {
					var shownext = self.makeUniqueRandom(seq.preset_shapes.length);
					console.log( seq.preset_shapes[shownext] );
					$('#counter').html(self.shapeme(seq.preset_shapes[shownext]));
				}

				total_time--;
				image_time_keep++;
				console.log( "Total Time: " + total_time )
			} else {
				self.stopcountdown(self.s, 'sequence');
			}
		}, 1000);

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
		this.s = '';
		this.uniqueRandoms = [];

		this.store = new LocalStorageStore(function() {
			self.route();
		});

    }

};

app.initialize();

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
