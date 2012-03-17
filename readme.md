#jquery.gestures.js
is a lightweight mobile gestures library for jQuery.

In this first version jquery.gestures.js provides only two gestures: swipeleft and swiperright.

More gestures will be added in later releases.

##Under Development!
This plugin is under development. Don't use it in your productive enviroment!

###Whats missing?
* Removing gestures (ToDo-List Rank #1)
* More gestures (swipeup,swipedown, moving/dragging, pinching in/out, rotating, touchhold, ...)

##Usage
Include jquery.gestures.js in your html file - after jQuery!
``` html
<script src="jquery.gestures.js"></script>
```

Thats it.
Now you can use these gestures like that:
``` javascript
$('#foo').on( 'gesture', '.bar', function() {
	// Your code goes here ...
});
```


##Gestures
jquery.gestures.js provides the following gestures:

###Swipe Left
Usage:
``` javascript
$('#foo').on( 'swipeleft', '.bar', function() {
	// Your code goes here ...
});
```

###Swipe Right
Usage:
``` javascript
$('#foo').on( 'swipeleft', '.bar', function() {
	// Your code goes here ...
});
```


##Feedback, Bug, Help, Ideas?
Fork it, [add an issue](https://github.com/thomaspink/jquery.gestures.js/issues) or contact me. :)

###Twitter
Follow: [twitter.com/thomasdotpink](http://twitter.com/thomasdotpink)
