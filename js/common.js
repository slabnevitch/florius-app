$(function() {

	var headerHeight;
	$(window).scroll(function() {

		headerHeight = $('.header').height();
		if($(this).scrollTop() > headerHeight){
			$('.header').addClass('header--fixed');
			$('body').css('margin-top', headerHeight);

		}else{
			$('.header').removeClass('header--fixed');
			$('body').css('margin-top', 0);
		}
	});

	$(document).ready(function() {

		// slick
			var $mainSlider = $('.main-slider__carousel').slick({
				arrows: false,
				fade: true,
				adaptiveHeight: true,
				dots: true
			});

			$('.main-slider__prev, .main-slider__next').click(function() {
				if($(this).hasClass('main-slider__prev')){
					$mainSlider.slick('slickPrev');
				}else{
					$mainSlider.slick('slickNext');
				}
			});

			$('.docs-slider').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				autoplay: true,
				responsive: [

			    {
			      breakpoint: 780,
			      settings: {
			        slidesToShow: 2
			      }
			    },

			    {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 1
			      }
			    }
			    ]

			});

			var arrowSlidersOpt = {
				slidesToShow: 5,
				adaptiveHeight: true,
				dots: true,
				autoplay: true,
				responsive: [
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 780,
		      settings: {
		        slidesToShow: 2
		      }
		    },

		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1
		      }
		    }
		    ]
			}

			var $pfolioSlider = $('.portfolio-slider').slick(arrowSlidersOpt);

			// $pfolioSlider.slick('slickSetOption', 'autoplay', true, true);
			

			var $ctmSlider = $('.air-ctm__slider').slick(arrowSlidersOpt);

			// $ctmSlider.slick('slickSetOption', 'dots', false, true);

			var $collSlider = $('.collective-slider').slick({
				slidesToShow: 4,
				arrows: false,
				autoplay: true,
				responsive: [
		    {
		      breakpoint: 960,
		      settings: {
		        slidesToShow: 3

		      }
		    },
		    {
		      breakpoint: 780,
		      settings: {
		        slidesToShow: 2
		         
		      }
		    },
		    {
		      breakpoint: 560,
		      settings: {
		        slidesToShow: 1,
		        // slidesToScroll: 1
		        adaptiveHeight: true
		      }
		    }
		    ]
			});

			$('.collective .slider-prev, .collective .slider-next').click(function() {
				if($(this).hasClass('slider-prev')){
					$collSlider.slick('slickPrev');
				}else{
					$collSlider.slick('slickNext');
				}
			});

			var $fabrSlider = $('.fabrication-slider').slick({
				arrows: false,
				fade: true,
				dots: true,
				autoplay: true
				
			});

			var $formsSlider = $('.forms-slider').slick(arrowSlidersOpt);

			// $formsSlider.slick('slickSetOption', 'dots', false, true);
		// end slick

		// mag.popup
		$('.button-popup').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#name',
				mainClass: 'mag-callback',

			// When elemened is focused, some mobile browsers in some cases zoom in
			// It looks not nice, so we disable it:
			callbacks: {
				beforeOpen: function() {
					if($(window).width() < 700) {
						this.st.focus = false;
					} else {
						this.st.focus = '#name';
					}
				}
			}
		});
		// end mag.popup

		// tabs
			var $tabs = $('.tabs__link');

			$tabs.on('click', function(e) {
				e.preventDefault();
				var $th = $(this),
				$href = $th.attr('href'),
				$parent = $th.parent();
				$parent.addClass('tabs__item--active')
				.siblings()
				.removeClass('tabs__item--active');

				$($href).removeClass('hidden')
				.siblings()
				.addClass('hidden');
				tabsSliderToggle($($href));

				$('.forms-download a span').text($th.text());
			});

			function tabsSliderToggle(sliderParent) {
				sliderParent.slick('reinit');
				// $formsSlider.slick('reinit');
			}
		// end of tabs

		// Tooltipster

			$('.tooltip').tooltipster({
				// plugins: ['sideTip', 'scrollableTip'],
				interactive: true,
				 trigger: 'hover',
				repositionOnScroll: true,
				 // arrow: false,
				 side: 'bottom',
				 // theme: 'tooltipster-shadow',
				 // repositionOnScroll: true,
				 // viewportAware: false,
				 contentCloning: true,
				 debug: true,
				 functionPosition: function(instance, helper, position){
				 		
				 		var posYHelper = helper.origin.getBoundingClientRect().top;
				 		
			 			position.coord.top = posYHelper - headerHeight + 50;
				 	return position;
				 },
				 functionReady: function(instance, helper) {
					
					helper.tooltip.classList.add('map-tip');
				}
			});
			$('.map-info').tooltipster({
				trigger: 'hover',
				side: 'right',
				viewportAware: false,
				minWidth: 309,
				contentAsHTML: true,
				functionReady: function(instance, helper) {
					
					helper.tooltip.classList.add('info-tip');
				},
				functionPosition: function(instance, helper, position){
				 		
				 		var posYHelper = helper.origin.getBoundingClientRect().top;
				 		
			 			position.coord.top = posYHelper - headerHeight;

				 	return position;
				 }

			});

			var $locTip = $('.loc-tooltip').tooltipster({
				// plugins: ['sideTip', 'scrollableTip'],
				interactive: true,
				 trigger: 'click',
				 // content: $('.tooltip_sizes'),
				 // arrow: false,
				 side: 'bottom',
				 arrow: false,
				 repositionOnScroll: true,
				 // viewportAware: false,
				 contentCloning: true,
				 debug: true,
				 functionPosition: function(instance, helper, position){
			 		
			 		if($(helper.origin).closest('.header').hasClass('header--fixed') && screen.width < 480){
			 			helper.tooltip.classList.add('info-tip--mobile');
			 			var posYHelper = helper.origin.getBoundingClientRect().top;
			 			position.coord.top -= posYHelper + 25;
			 		}

				 	if(screen.width > 480){

				        position.side = 'bottom';
				        
				        var container = helper.origin,
				        	containerRight = container.getBoundingClientRect().right;
				        var summ = position.coord.left + position.size.width,
				        	difference = summ - containerRight;
				      
				        position.coord.top -= 5,
				        position.coord.left -= difference - 5;

				        
				     
				 	}
				        return position;
			    },

			    functionReady: function() {
			    	$('.close-icon').bind('click', locTooltipClose);
			    	$('.loc-list').find('span').addClass('opened');
			    },
			    functionAfter: function() {
			    	$('.close-icon').unbind('click', locTooltipClose);
			    	$('.loc-list').find('span').removeClass('opened');
			    }
			});

			function locTooltipClose() {
				$locTip.tooltipster('close');
				$('.loc-list').find('span').removeClass('opened');

			}

			// $('.loc-list').click(function(	) {
			// 	$(this).find('span').toggleClass('opened');
			// });

			// $('.close-icon').click(function() {
			// 	console.log('close click');
			// });
		// end Tooltipster
	});

	// language toggle
		$('.header-lang a').click(function(e) {
			e.preventDefault();
			$(this).addClass('header-lang__active')
						.siblings()
						.removeClass('header-lang__active');
		});
	// end language toggle
	
	$(".header-yellow .toggle-mnu, .body-cover").on('click', function() {
		$('.header-yellow .toggle-mnu').toggleClass("on");
		$('html').toggleClass('open');

		return false;
	});

	$('.sidebar-green .toggle-mnu').click(function() {
		$('.green-menu').slideToggle();
		$(this).toggleClass("on");
		return false;
	});

	$('.button--animated').each(function () {
        var $this = $(this);

        var ink, d, x, y;

        setInterval(function () {
            if ($this.find(".ink").length === 0) {
                $this.prepend("<span class='ink'></span>");
             }

            ink = $this.find(".ink");
            ink.removeClass("animate");

            if (!ink.height() && !ink.width()) {
                d = Math.max($this.outerWidth(), $this.outerHeight());
                ink.css({
                    height: d,
                    width: d
                });
            }

            x = Math.round(Math.random() * ink.width() - ink.width());
            y = Math.round(Math.random() * ink.height() - ink.height());
            // y = 0;
            // x = e.pageX - $this.offset().left - ink.width()/2;
            // y = e.pageY - $this.offset().top - ink.height()/2;

            ink.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("animate");
        }, 3000);
    });


	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});
