var seen_video = 0;

$(document).ready(function(){ 
	// Google analytics...
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-52485330-1', 'auto');
	ga('send', 'pageview');

	// Customize css for mobile...
	if (navigator.userAgent.match('iPad')) {
		$('body').addClass('iPad');
		show_video(seen_video);
	} else if (jQuery.browser.mobile) {
		$('body').addClass('iPhone');
	} else {
      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/iframe_api";
	  var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	$('section.mobile>.mobile_button').click(function(){
		if ($(this).attr('id') == 'button1') {
			window.open('http://www.twitter.com/revolveagency');
		} else if ($(this).attr('id') == 'button2') {
			window.open('https://www.facebook.com/revolveagency');
		} else if ($(this).attr('id') == 'button3') {
			window.open('https://www.linkedin.com/company/revolve-agency');
		} else if ($(this).attr('id') == 'button4') {
			window.open('https://www.youtube.com/user/REVOLVEAGENCY');
		}
	});

	$('#fullpage').fadeIn(200);
	$('header').fadeIn(200);
	setTimeout(function(){
		adjust_font_sizes($(window).width(),$(window).height());
	}, 500);

	$(window).resize(function(){
		adjust_font_sizes($(window).width(),$(window).height());
	});
	$('.close_button').click(function(){
		close_video();
	});
	$('.map').click(function(){
		window.open('https://www.google.com/maps/place/11845+W+Olympic+Blvd,+Los+Angeles,+CA+90064/@34.0332161,-118.4516538,17z/data=!3m1!4b1!4m2!3m1!1s0x80c2bb12713d883b:0x438923602b74a418');
	});
	
	$('.logo').click(function(){
		$.fn.fullpage.moveTo('home');
	});

	$('.social#facebook').click(function(){
		window.open('https://www.facebook.com/revolveagency');
	});
	$('.social#twitter').click(function(){
		window.open('http://www.twitter.com/revolveagency');
	});
	$('.social#linked_in').click(function(){
		window.open('https://www.linkedin.com/company/revolve-agency');
	});
	$('#reel_trigger').click(function(){
		show_video(0);
	});
	
	// Initialize jQuery.fullpage to handle navigation
	$('#fullpage').fullpage({
		anchors: ['home', 'about', 'capabilities', 'clients', 'contact'],
		menu: '#menu',
		scrollingSpeed: 1000,
		easing: 'easeInOutCubic',
	    afterRender: function(){
			if (window.location.hash == '' || window.location.hash == '#home') { 
				seen_video = 1;
			}
		},
	    afterLoad: function(anchorLink, index){
			ga('send', 'pageview', anchorLink);
            if(anchorLink == 'home'){
				if ($('#player').length < 1) {
					$('footer').fadeIn(500);
					$('header').addClass('white').removeClass('black');
					$('header>.black_bg').fadeOut(400);
					$('#particles').fadeIn(400);
					$('#menu>li.active').removeClass('active');
				}
            } else {
				if ($('#player').length == 1) {
					close_video();
				}
				if (navigator.userAgent.match('iPhone')) {
//					$('header>#menu>li').css({'display':'none'});
				} else {
					$('header').addClass('black').removeClass('white');
					$('header>.black_bg').fadeIn(400);
				}
            }
//            if(anchorLink == 'clients'){
//				$('#page1').css({'display':'block'});
//				setTimeout(function(){
//					flip_client_images(1);
//				}, 5000);
//			}
        }
	});
});

function adjust_font_sizes(width,height) {
	if (!navigator.userAgent.match('iPhone')) {
		m = (parseInt(((height+width)+parseInt((height/width)*100))*.01));
		$('.about p').css({'font-size':(m*1.3)+'px', 'line-height':(m*1.7)+'px'});
		$('.about h1').css({'font-size':(m*2)+'px'});
		$('.contact p').css({'font-size':(m*.6)+'px', 'line-height':(m*.9)+'px'});
		$('.contact h1').css({'font-size':(m*2)+'px'});
		$('.contact h2').css({'font-size':(m*1.5)+'px'});
		$('.clients h1').css({'font-size':(m*2)+'px'});
		$('.capabilities h1').css({'font-size':(m*2)+'px'});
		$('.capabilities h2').css({'font-size':(m*1.3)+'px'});
		$('.capabilities p').css({'font-size':(m*.9)+'px', 'line-height':(m*.9)+'px'});
		$('#fullpage>.section>.fp-tableCell>.content>.column>.image').css({'width':(m*3)+'px','height':(m*3)+'px','margin-left':-(m*3/2)+'px'});
	}

	if (navigator.userAgent.match('iPad') && width < 970) {
		$('header>.logo').fadeOut('fast');
		$('#fullpage>.section.contact>.fp-tableCell>.content>.map').css({'float':'right','clear':'none','width':'44%','height':'100%','min-width':'400px','margin-top':'10px'});
		$('.map').css({'height':$('.map').width()});
	} else if (navigator.userAgent.match('iPad') && width > 970) {
		$('header>.logo').fadeIn('fast');
		$('#fullpage>.section.contact>.fp-tableCell>.content>.map').css({'float':'right','clear':'none','width':'44%','height':'100%','min-width':'400px','margin-top':'10px'});
		$('.map').css({'height':$('.map').width()});
	} else if (width < 1228) {
		$('header>.logo').removeClass('small');
		$('header>.logo').fadeOut('fast');
		$('#fullpage>.section.contact>.fp-tableCell>.content>.map').css({'position':'relative','float':'left','clear':'left','height':'30%', 'width':'100%', 'margin-left':'0%', 'min-width':'10px','margin-top':'0'});
	} else {
		$('header>.logo').fadeIn('fast').removeClass('small');
		$('#fullpage>.section.contact>.fp-tableCell>.content>.map').css({'float':'right','clear':'none','width':'44%','height':'100%','min-width':'400px','margin-top':'10px'});
		$('.map').css({'height':$('.map').width()});
	}
}

function flip_client_images(current) {
	$('#page'+current).fadeOut(500);
	current = (current==1?2:1);
	$('#page'+current).fadeIn(500);
	setTimeout(function(){flip_client_images(current)},5000);
}

function show_video(seen_video) {
	if (seen_video == 0) {
		if (navigator.userAgent.match('iPad')) {
			$('header').fadeIn(500);
			$('header').addClass('black').removeClass('white');
			$('.home #logo,header>.black_bg,.close_button').fadeIn(500);
			$('#particles,#particle_overlay').fadeOut(400);
			$('#section0').prepend('<div id="player"><div class="inner"><video width="100%" height="100%" id="video1" controls poster="/images/poster.png"><source id="mp4" type="video/mp4" codecs="avc1, mp4a" src="/images/Revolve Agency 2014 Sizzle Reel.mp4"></video></div></div>');
			document._video = document.getElementById("video1");
			document._video.addEventListener("loadeddata", function () {
	         	 document._video.play();
			}, false);
			document._video.addEventListener("ended", function () {
	            close_video();
			}, false);
		} else if (navigator.userAgent.match('iPhone')) {
			$('#section0').prepend('<div id="player"><div class="inner"><video width="100%" height="100%" id="video1" controls poster="/images/poster.png"><source id="mp4" type="video/mp4" codecs="avc1, mp4a" src="/images/Revolve Agency 2014 Sizzle Reel Small.m4v"></video></div></div>');
			$('.close_button').fadeIn(500);
		} else {
			onYouTubeIframeAPIReady();
		}
	} 
}


function onYouTubeIframeAPIReady() {
	if (window.location.hash.match('#reel')) {
		var alt_vids = {'#reel1':'XlqGpoE_vMk','#reel2':'FcjQsyTM3Tc','#reel3':'miDpywjxoHQ'};
		yt_code = alt_vids[window.location.hash];
	} else {
		yt_code = '33HfkPJ4XjI'
	}
	$('header').fadeIn(500);
	if (navigator.userAgent.match('iPad')) {
		$('header').addClass('white').removeClass('black');
		$('.home #logo,header>.black_bg,.close_button').fadeOut(500);
		$('#particles,#particle_overlay').fadeIn(500);
		$('.home #logo').fadeIn(1000);
	} else {
		$('header').addClass('black').removeClass('white');
		$('.home #logo,header>.black_bg,.close_button').fadeIn(500);
		$('#section0').prepend('<div id="player"></div>');
		var player;
		player = new YT.Player('player', {
			videoId: yt_code,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		seen_video = 1;
	}
}


function onPlayerReady(event) {
	if (navigator.userAgent.match('iPad') ||navigator.userAgent.match('iPhone') || navigator.userAgent.match('android') || navigator.userAgent.match('mobile')) {
	} else {
		event.target.playVideo();
	}
}

function onPlayerStateChange(event) {
	if (event.data == 0) close_video();
}

function close_video() {
	$('#player').remove();
	$('.close_button').fadeOut(500);
	$('.home #logo').fadeIn(1000, function(){
		$('footer').fadeIn(500);
		$('#particles,#particle_overlay').fadeIn(400);
		if (window.location.hash == '' || window.location.hash == '#home') { 
			$('header').addClass('white').removeClass('black');
			$('header>.black_bg').fadeOut(400);
		}
		$('header.white #menu>li.active').removeClass('active');
	});
}
