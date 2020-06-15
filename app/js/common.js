$(document).ready(function() {
// GENERALS
//scroll add .scroll to buttons for slowly move to anchor
$('.scroll').bind('click.smoothscroll',function (e) {
	e.preventDefault();
	var target = this.hash,
	$target = $(target);
	$('html, body').stop().animate({
		'scrollTop': $target.offset().top
	}, 900, 'swing', function () {
		window.location.hash = target;
	});
});


// MAIN PAGE
var mainPage = document.getElementById('first')
if( mainPage ) {


	// top paralax
	if ( window.innerWidth > 992 ) {
		var scene = document.getElementById('scene');
		new Parallax(scene);
	} else {

	}

	// $(".phone-mask").mask("099-999-99-99");

	// EGGS
	if ( window.innerWidth < 992 ) {
		// $('.eggs__list').addClass('owl-carousel')
		// $('.eggs__list').owlCarousel({
		// 	animateOut: 'fadeOut',
		// 	animateIn: 'fadeIn',
		// 	smartSpeed: 450,
		// 	loop: true,
		// 	nav: false,
		// 	autoplay: true,
		// 	autoplayHoverPause: true,
		// 	autoplayTimeout: 3000,
		// 	margin: 0,
		// 	dots: true,
		// 	responsiveClass: true,
		// 	items: 3
		// });
	}

	// countdown
		var endTimer      = Date.now() + (60 * 60 * 3 * 1000) + (60 * 42 * 1000); // 3:42
		var cookieName    = "endTimer";
		var checkCookie   = getCookie(cookieName);
		if(!checkCookie) setCookie(cookieName, endTimer, 30);
		var cookie        = getCookie(cookieName);

		var timerConfig = {
			el: '.countdown',
			endTimer: cookie
		};

		if( cookie > Date.now() ){
			var timer = new CountdownTimer( timerConfig.el, timerConfig.endTimer);
		} else {
			setCookie(cookieName, endTimer, 30);
			timerConfig.endTimer = getCookie(cookieName);
			var timer = new CountdownTimer( timerConfig.el, timerConfig.endTimer);
		}	
		timer.countDown();
		
	// sliders
		$('#stars__slider').owlCarousel({
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			smartSpeed:450,
			loop: false,
			nav: false,
			autoplay: true,
			autoplayHoverPause: true,
			autoplayTimeout: 3000,
			margin: 0,
			dots: true,
			responsiveClass: true,
			items: 1
		});

		$('.rev__slider').owlCarousel({
			loop: false,
			nav: false,
			autoplay: false,
			autoplayHoverPause: true,
			autoplayTimeout: 9000,
			margin: 20,
			dots: true,
			responsiveClass: true,
			// items: 3,
			responsive: {
				0: {
					items: 1,
					stagePadding: 25,
					margin: 10
				},
				556: {
					items: 1,
					stagePadding: 50
				},
				992: {
					items: 3
				}
			}
		});

	if (window.innerWidth < 768) {
		$('.eggs__list').addClass(' owl-carousel')
		$('.eggs__list').owlCarousel({
			loop: false,
			nav: false,
			autoplay: false,
			autoplayTimeout: 99000,
			margin: 20,
			dots: true,
			responsiveClass: true,
			// items: 3,
			responsive: {
				0: {
					items: 1,
					stagePadding: 25,
					margin: 10
				},
				556: {
					items: 3,
					stagePadding: 50,
					margin: 5
				},
				992: {
					items: 3
				}
			}
		});
	}

	if (window.innerWidth < 992) {
		$('.steps__step').addClass(' owl-carousel')
		$('.steps__step').owlCarousel({
			loop: false,
			nav: false,
			autoplay: false,
			autoplayTimeout: 99000,
			margin: 20,
			dots: true,
			responsiveClass: true,
			// items: 3,
			responsive: {
				0: {
					items: 1,
					stagePadding: 25,
					margin: 10
				},
				556: {
					items: 1,
					stagePadding: 50
				},
				992: {
					items: 3
				}
			}
		});
	}




}
// SALE PAGE
	$('.order__select select').on('click', function(e){
		$('.order__select').toggleClass('opened')
	});
	$('.order__select select').on('change', function(e){
		var selected = $('option:selected', e.target)
		console.log( selected.val() )

		if( selected.val() === 'consultation' ) {
			$('.order__details').removeClass('opened')
		} else {
			$('.order__details').addClass('opened')
		}
	});







//end ready
});












// FUNCTION DECLARATIONS:
	// cookie
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
		}
		return ;
	}

	function checkCookie() {
		var user = getCookie("username");
		if (user != "") {
		alert("Welcome again " + user);
		} else {
		user = prompt("Please enter your name:", "");
		if (user != "" && user != null) {
			setCookie("username", user, 365);
		}
		}
	}


	/* How use class countDownTimer
		new CountdownTimer({
			".countdown",
			Date.now() + 30000,
			"time is end"
		});
	 */
	function CountdownTimer(elem, time, message){
		this.initialize.apply(this, arguments);
	}

	CountdownTimer.prototype = {

		initialize: function(elem, time, message) {
			this.elems = document.querySelectorAll(elem);
			this.endTime 	= time;
			message = message || "00:00:00";
			this.message 	= '<span class="number-wrapper end">\
				<div class="line"></div>\
				<span class="number end">'+ message +'</span>\
			</span>';
		},

		countDown: function(){
			var today = new Date();
			var resultDate = this.endTime - today;
			var day   = Math.floor( resultDate / (24*60*60*1000));
			var hour  = Math.floor(( resultDate % (24*60*60*1000)) / (60*60*1000));
			var min   = Math.floor(( resultDate % (24*60*60*1000)) / (60*1000)) % 60;
			var sec   = Math.floor(( resultDate % (24*60*60*1000)) / 1000) % 60 % 60;
			var timer = '';
			var self  = this;

			if( resultDate > 0 ){
				// if you need 'day' just copy and paste html below in variable timer
				timer = '<div class="number-wrapper">\
								<div class="line">	</div>\
								<span class="number">'+this.addZero(hour)+'</span>\
								<div class="caption">час</div>\
							</div>';
				timer += '<div class="number-wrapper">\
								<div class="line">	</div>\
								<span class="number">'+this.addZero(min)+'</span>\
								<div class="caption">мин</div>\
							</div>';
				timer += '<div class="number-wrapper last">\
								<div class="line">	</div>\
								<span class="number">'+this.addZero(sec)+'</span>\
								<div class="caption">сек</div>\
							</div>';

				for (var i = 0; i < this.elems.length; i++) {
					this.elems[i].innerHTML = timer;
				}

				var id = setTimeout( function(){
					self.countDown();
				}, 10);
				
			} else {

				for (var i = 0; i < this.elems.length; i++) {
					this.elems[i].innerHTML = this.message;
				}

			}
			
		},
		addZero: function(num){
			return ('0'+num).slice(-2);
		}
	}