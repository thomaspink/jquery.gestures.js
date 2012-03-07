!function( window, document, $, undefined ){
	
	"use strict"


	var Gesture = function(elem, handler) {

		if ( !(this instanceof Gesture) ) {
	        return new Gesture( elem, handler );
	    }

		this.elem = elem;
		this.handler = handler;
	}


	Gesture.prototype = {

		  swipeXoffset: 200, swipeYoffset: 100

		, swipeleft: function() {
			this.swipe(this.handler,"left");
		}
		
	  	, swiperight: function() {
	  		this.swipe(this.handler,"right");
		}

	  	, swipe: function(callback,direction) {

	  		var that = this
	  		  , xstart 	= 0
	  		  , xend 	= 0
	  		  , ystart 	= 0
	  		  , yend 	= 0
	  		  ;

	  		this.elem.addEventListener("touchstart", function(event) {
	  			xstart = event.targetTouches[0].pageX;
	  			ystart = event.targetTouches[0].pageY;
			}, false);

			this.elem.addEventListener("touchend", function(event) {
				xend = event.changedTouches[0].pageX;
				yend = event.changedTouches[0].pageY;
				direction = direction === "right" ? direction = "right" : direction = "left";

				if(xstart - xend >= that.swipeXoffset 
				&& (ystart-yend <= that.swipeYoffset || yend-ystart <= that.swipeYoffset) 
				&& direction === "left" ) {
					if(typeof callback == "function") {
						callback();
					}
				}

				if(xend - xstart >= that.swipeXoffset 
				&& (ystart-yend <= that.swipeYoffset || yend-ystart <= that.swipeYoffset) 
				&& direction === "right" ) {
					if(typeof callback === "function") {
						callback();
					}
				}
			}, false);
	  	}
	}


	// Override jQuery.event.add
	var add = $.event.add;
	$.event.add = function(elem, types, handler, data, selector) {
		var t = types.split(" ");
		for ( var i = 0; i < t.length; i+=1 ) {
			if (typeof Gesture.prototype[t[i]] === "function") {
				var gesture = new Gesture(elem,handler);
				gesture[t[i]]();
			}
		}
		add.apply(this,arguments);
	}

	// Override jQuery.event.add
	var add = $.event.remove;
	$.event.remove = function(elem, types, handler, data, selector) {
		var t = types.split(" ");
		for ( var i = 0; i < t.length; i+=1 ) {
			if (typeof Gesture.prototype[t[i]] === "function") {
				var gesture = new Gesture(elem,handler);
				gesture[t[i]]();
			}
		}
		add.apply(this,arguments);
	}

}( window, window.document, window.jQuery)