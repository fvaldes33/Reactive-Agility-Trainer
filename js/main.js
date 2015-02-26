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
			$('body').on('touchend', '.menu-icon', function(event) {
				event.preventDefault();
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
			$('body').on('click', '.menu-icon', function(event) {
				
			});
			
			$(window).on('hashchange', $.proxy(this.route, this));
		}
	
	},
	
	route: function() {
		var self = this;
		var hash = window.location.hash;
		
		if (!hash) {
			$('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-right');
			//$('body').html(new HomeView().renderPage().el);
		} else if ( hash == "#HOME" ) { 
			$('body').html(new HomeView().renderPage().el);
		} else if ( hash == "#SETTINGS" ) { 
			$('body').html(new SettingsView().renderPage().el);
		} else if ( hash == "#STARTER" ) { 
			$('body').html(new StarterView(this.store).renderPage().el);
		}
		
	},
	
	initialize: function() {
		var self = this;
		
		location.hash = "#HOME";
		
		this.registerEvents();
		
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
	} else {
		result = mytime;
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