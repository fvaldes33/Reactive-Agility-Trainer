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
			$('body').html(new HomeView().renderPage().el);
			
		} else if ( hash == "#SETTINGS" ) { 
			$('body').html(new SettingsView().renderPage().el);
		} else if ( hash == "#STARTER" ) { 
			$('body').html(new StarterView(this.store).renderPage().el);
		}
		
	},
	
	initialize: function() {
		var self = this;
		
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