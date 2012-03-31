!function( window, document, $, undefined ){
	
	"use strict"

	var Gestures = function() {

		if ( !(this instanceof Gestures) ) {
	        return new Gestures();
	    }

	    this.events = {

	    	options: {
	    		nodeIdName: 'data-gestures-id'
	    	  , swipeXoffset: 100
	    	  , swipeYoffset: 100
	    	}

	    	, touchstart: {

	    		attach: function( that, $elem, fn ) {
	    			that.add( $elem, 'touchstart', 'touchstart' , function(event){
	    				var data = {
	    					x: event.targetTouches[0].pageX
	    				  , y: event.targetTouches[0].pageY
	    				}
		  				fn.apply($elem[0], [ data ]);
					});
	    		}

	    	  , detach: function( that, $elem, fn ) {
			  		that.remove ( $elem, 'swipeleft', 'touchstart' );
			  		fn.apply($elem[0]);
			  	}
	    	}

	    	, touchend: {

	    		attach: function( that, $elem, fn ) {
	    			that.add( $elem, 'touchend', 'touchend' , function(event){
	    				var data = {
	    					x: event.changedTouches[0].pageX
	    				  , y: event.changedTouches[0].pageY
	    				}
		  				fn.apply($elem[0], [ data ]);
					});
	    		}

	    	  , detach: function( that, $elem, fn ) {
			  		that.remove ( $elem, 'touchend', 'touchend' );
			  		fn.apply($elem[0]);
			  	}
	    	}

			, swipeleft: {

				attach: function( that, $elem, fn ) {

					var xstart 	= 0
			  		  , xend 	= 0
			  		  , ystart 	= 0
			  		  , yend 	= 0
			  		  ;
					
					that.add( $elem, 'swipeleft', 'touchstart' , function(event){
						xstart = event.targetTouches[0].pageX;
		  				ystart = event.targetTouches[0].pageY;
					});

					that.add( $elem, 'swipeleft', 'touchend' , function(event){
						xend = event.changedTouches[0].pageX;
						yend = event.changedTouches[0].pageY;

						if( xstart - xend >= that.events.options.swipeXoffset 
							&& ( ystart-yend <= that.events.options.swipeYoffset 
								|| yend-ystart <= that.events.options.swipeXoffset ) 
							) {
							fn.apply($elem[0]);
						}
					});

				}

			  , detach: function( that, $elem, fn ) {
			  		that.remove ( $elem, 'swipeleft', 'touchstart' );
			  		that.remove ( $elem, 'swipeleft', 'touchend' );
			  		fn.apply($elem[0]);
			  	}

			}

			, swiperight: {
			
				attach: function( that, $elem, fn ) {

					var xstart 	= 0
			  		  , xend 	= 0
			  		  , ystart 	= 0
			  		  , yend 	= 0
			  		  ;
					
					that.add( $elem, 'swiperight', 'touchstart' , function(event){
						xstart = event.targetTouches[0].pageX;
		  				ystart = event.targetTouches[0].pageY;
					});

					that.add( $elem, 'swiperight', 'touchend' , function(event){
						xend = event.changedTouches[0].pageX;
						yend = event.changedTouches[0].pageY;

						if( xend - xstart >= that.events.options.swipeXoffset 
							&& ( ystart-yend <= that.events.options.swipeYoffset 
								|| yend-ystart <= that.events.options.swipeYoffset ) ) {
							fn.apply($elem[0]);
						}
					});

				}

			  , detach: function(that, $elem, fn ) {
			  		that.remove ( $elem, 'swiperight', 'touchstart' );
			  		that.remove ( $elem, 'swiperight', 'touchend' );
			  		fn.apply($elem[0]);
			  	}
			
			}

		}

	}

	Gestures.prototype = {

		handler: [], id: 0

		, on: function( elem, types, selector, fn ) {

			var tps = types.split(' ')
			  , $elem = ( typeof selector === 'string' ) ? $(elem).find(selector) : $(elem);
			
			types = "";

			for( var i=0, max = tps.length; i<max; i+=1 ) {
				if( this.events.hasOwnProperty(tps[i]) && typeof this.events[tps[i]].attach == 'function' ) {
					this.events[tps[i]].attach( this, $elem, fn );
				} else {
					types += ( types.length ? ' ' : '' ) + tps[i];
				}
			}

			return types;
		}

		, add: function( $elem, event, type, fn ) {
			
			var id = $elem[0].getAttribute(this.events.options.nodeIdName) 
					 ? parseInt($elem[0].getAttribute(this.events.options.nodeIdName),10) : this.id++
			  , callback = {}
			  ;

			callback[event] = fn;

			if( this.handler[id] ) {

				if( this.handler[id][type] ) {

					this.handler[id][type].callbacks.push(callback);

				} else {

					this.handler[id][type] = {
						callbacks: []
					};

					this.handler[id][type].callbacks.push(callback);

					this.addListener( $elem[0], type );

				}

			} else {
				
				var event = {};
				event[type] = {
					callbacks: []
				};

				event[type].callbacks.push(callback);
				this.handler[id] = event;

				$elem[0].setAttribute(this.events.options.nodeIdName,id);
				
				this.addListener( $elem[0], type );
			}

		}

		, addListener: function( elem, type ) {

			var that = this;

			elem.addEventListener(type, function(event) {

				var i = 0
				  , callbacks = that.handler[parseInt(this.getAttribute(that.events.options.nodeIdName),10)][type].callbacks
				  , max = callbacks.length;

				for ( i; i< max; i+=1 ) {
					for( var callback in callbacks[i] ) {
						callbacks[i][callback](event);
					}
				}

			});

		}

		, off: function( elem, types, selector, fn ) {

			var tps = types.split(' ')
			  , $elem = ( typeof selector === 'string' ) ? $(elem).find(selector) : $(elem);
			types = "";

			for( var i=0, max = tps.length; i<max; i+=1 ) {
				if( this.events.hasOwnProperty(tps[i]) && typeof this.events[tps[i]].attach == 'function' ) {
					this.events[tps[i]].detach( this, $elem, fn );
				} else {
					types += ( types.length ? ' ' : '' ) + tps[i];
				}
			}

			return types;

		}

		, remove: function( $elem, type, event ) {

			var id = parseInt($elem[0].getAttribute(this.events.options.nodeIdName),10)
			  , callbacks = this.handler[id][event].callbacks
			  ;

			for(var i = 0; i < callbacks.length; i+=1){
				if( callbacks[i].hasOwnProperty(type) ) {
					callbacks.splice(i,1);
				}
			}

			if( !callbacks.length ) {
				$elem[0].removeEventListener(event);
				delete this.handler[id][event];
			}

		}

		, isTouch: function() {
			/*return ('ontouchstart' in window) 
				|| window.DocumentTouch && document instanceof DocumentTouch;
				*/
			return true;
		}
		
	}


	/*
	 *	Create on method or override jQuery.on
	 */

	var on = false;
	typeof $.fn.on === 'function' && ( on = $.fn.on );

	$.fn.on = function( types, selector, data, fn, one ) {

		if(Gestures().isTouch()) {

			if( selector === 'function' ) {
				fn = selector;
				selector = undefined;
			} else {
				fn = ( typeof data === 'function' ) ? data : fn;
			}

			window.gestures || ( window.gestures = new Gestures() );

			typeof types === 'string' 
			&& ( types = window.gestures.on( this, types, selector, fn ) );

		}

		on && types.length && on.apply( this,arguments );
	}


	/*
	 *	Create off method or override jQuery.off
	 */

	var off = false;
	typeof $.fn.off === 'function' && ( off = $.fn.off );

	$.fn.off = function( types, selector, fn ) {
		
		if(Gestures().isTouch()) {
			
			if( selector === 'function' ) {
				fn = selector;
				selector = undefined;
			}

			typeof types === 'string' && window.gestures 
			&& ( types = window.gestures.off( this, types, selector, fn ) );

		}

		off && types.length && off.apply( this,arguments );
	}

}( window, window.document, window.jQuery );