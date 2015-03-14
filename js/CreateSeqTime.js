var CreateSeqTime = function(store) {

  this.selector = function(){
    var self = this;
    $('body').on('mousedown touchstart', '.changetime', function(e){

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

    $('body').on('mouseup touchend', '.changetime', function(e){

      self.mousedown = false;

    });
  };

  this.increment = function(act, sendto, inc){
    var self = this;

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

    if( this.mousedown ){
      setTimeout(function(){ self.increment(act, sendto, inc); }, 50);
    }

  }

  this.submission = function(){

  };

	this.renderPage = function(){

		this.el.append( this.inner );
		this.inner.html(CreateSeqTime.toptemplate());
		this.inner.append( CreateSeqTime.sectiontemplate() );

		return this;
	};

	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        console.log("CreateSeqTime Initialize Called");
		this.el = $('<div class="off-canvas-wrap" data-offcanvas />');
		this.inner = $('<div class="inner-wrap" />');
		this.section = $('<section class="main-section" />');

    this.selector();
    this.submission();
    this.mousedown = false;

	};

	this.initialize();

};

CreateSeqTime.toptemplate = Handlebars.compile($("#top-bar-tpl").html());
CreateSeqTime.sectiontemplate = Handlebars.compile($("#cst-section-tpl").html());

$(function(){

});
