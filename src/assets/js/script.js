jQuery(document).ready(function ($) {

           var mySlider = $('#partial-view').partialViewSlider();
		   
		   // back to previous image
			mySlider.prev();

			// go to next image
			mySlider.next();

			// pause the slider
			mySlider.pause();

			// resume the slider
			mySlider.play();
			
			$('#partial-view').partialViewSlider({

			  // 70%
			  width: 70,

			  // shows controls
			  controls: false,

			  // inside, outside, neighbors
			  controlsPosition: 'inside', 

			  // shows background
			  backdrop: true,

			  // shows pagination dots
			  dots: true,

			  // enable autoplay
			  auto: true,

			  // transition speed in ms
			  transitionSpeed: 400,

			  // autoplay delay in ms
			  delay: 4000,

			  // enable pause on hover
			  pauseOnHover: false,

			  // enable keyboard interactions
			  keyboard: true,

			  // enable perspective mode
			  perspective: true,

			  // show multiple items at once. 
			  // this is an object of resolutions and number of items above that resolution. 
			  items: {"0": 1},

			  // custom next/prev arrows
			  prevHtml: '<i class="material-icons">chevron_left</i>',
			  nextHtml: '<i class="material-icons">chevron_right</i>'
	  
			});
			
			$('#partial-view').partialViewSlider({

			  onLoad: function() {},
			  onSlideEnd : function() {}

			});
        });
