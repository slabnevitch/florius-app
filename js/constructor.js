$(function() {
	$(document).ready(function() {

		var $selects = $('.constructor-select')
			$selects.each(function(ind, elem) {
				$(elem).ikSelect({
					autoWidth: false,
					ddCustomClass: 'constructor-dd',
					onShow: function (inst) {
						console.log(inst);
						var currWidth = $(inst.el).closest('.ik_select').find('.ik_select_link').outerWidth();
						console.log(currWidth);
						$('.ik_select_dropdown').width(currWidth);

						if($('.header').hasClass('header--fixed')){
							var $customSelect = $(inst.el).closest('.ik_select'),
								customSelectTop = $customSelect.offset().top,
								customSelectHeight = $customSelect.height();

							$('.ik_select_dropdown').css('top', customSelectTop + customSelectHeight - 82 + 'px');
						}

					}
				});
			});

			 $variantsSlider = $('.constructor-variants__slider');

			var variantsSliderSettings = {
				slidesToShow: 1,
				arrows: false,
				dots: false,
				mobileFirst: true
		    };


			if(screen.width < 768){
		    	$variantsSlider.slick(variantsSliderSettings);
				// $variantsSlider.slick('unslick');
			}

			$(window).resize(function() {
				if ($(window).width() > 768) {
					if ($variantsSlider.hasClass('slick-initialized')) {
						$variantsSlider.slick('unslick');
					}
					return
				}

				if (!$variantsSlider.hasClass('slick-initialized')) {
					return $variantsSlider.slick(variantsSliderSettings);
				}
			});


			$('.constr-tooltip-button').tooltipster({
				trigger: 'hover',
				side: 'bottom',
				arrow: false,
				viewportAware: false,
				minWidth: 147,
				trackOrigin: true,
				contentAsHTML: true,
				contentAsHTML: true,
				functionBefore: function() {
					// if()
				},
				functionReady: function(instance, helper) {
					
					helper.tooltip.classList.add('constr-button-tip');
					helper.tooltip.classList.add('constr-tooltip');
				},
				functionPosition: function(instance, helper, position){
					position.coord.top = helper.origin.getBoundingClientRect().top + helper.origin.offsetWidth + 15;
					
					if($('.header').hasClass('header--fixed')){
						// helper.tooltip.classList.add('info-tip--mobile');
						var posYHelper = helper.origin.getBoundingClientRect().top;
						position.coord.top = posYHelper - 30;
					}
					return position;
				}

			});

			$('.constructor-image-tooltip').tooltipster({
				trigger: 'hover',
				side: 'bottom',
				arrow: false,
				viewportAware: false,
				minWidth: 147,
				trackOrigin: true,
				contentAsHTML: true,
				functionReady: function(instance, helper) {
					
					helper.tooltip.classList.add('constr-tooltip');
					helper.tooltip.classList.add('constr-image-tip');
				},
				functionPosition: function(instance, helper, position){
					position.coord.top = helper.origin.getBoundingClientRect().top - 97;
					console.log(helper.origin.offsetWidth);

					position.coord.left = helper.origin.getBoundingClientRect().left + (helper.origin.offsetWidth/2) + 40;
					if($('.header').hasClass('header--fixed')){
						// helper.tooltip.classList.add('info-tip--mobile');
						var posYHelper = helper.origin.getBoundingClientRect().top;
						position.coord.top = posYHelper - 30;
					}
					return position;
				}

			});

			$('.constructor-volume__select-wrap').tooltipster({
				trigger: 'hover',
				side: 'bottom',
				arrow: false,
				viewportAware: false,
				// minWidth: 147,
				trackOrigin: true,
				contentAsHTML: true,
				functionReady: function(instance, helper) {
					
					helper.tooltip.classList.add('constr-tooltip');
					helper.tooltip.classList.add('constr-select-tip');
				},
				functionPosition: function(instance, helper, position){
					position.coord.top = helper.origin.getBoundingClientRect().top - 110;
					console.log(helper.origin.offsetWidth);

					position.coord.left = helper.origin.getBoundingClientRect().left - 32;
					if($('.header').hasClass('header--fixed')){
						// helper.tooltip.classList.add('info-tip--mobile');
						var posYHelper = helper.origin.getBoundingClientRect().top;
						position.coord.top = posYHelper - 30;
					}
					return position;
				}

			});

			// layout edit
			function Layout() {
				var _self = this,
						$layouts = $('.constructor-layout');


				this.init = function() {

					console.log('layout init!');

					this.listeners();
				},

				this.listeners = function() {
					$('.constructor-input').on('focus', this.inputFocus);
					// $('.constructor-input').on('blur', this.inputBlur);
					$('.constructor-layout__image').on('click', this.imageClick);
					$('.constructor-layout__label .constructor-delete').on('click', this.hideText);
					$('.constructor-text-add').on('click', this.addText);
					$('.constructor-del-img').on('click', this.removeImg);
					$('.constructor-layout__file').on('click', this.fileClick);
				},

				this.fileClick = function() {
					_self.sampleActivation($(this).closest('.constructor-layout'));
				},

				this.removeImg = function() {
					$(this).closest('.constructor-layout')
						.find('.constructor-layout__loaded-img')
						.remove();
				},

				this.addText = function() {
					$(this).closest('.constructor-layout')
						.find('.constructor-layout__label')
						.removeClass('constructor-hidden');
				}

				this.inputBlur = function() {
					$(this).closest('.constructor-layout__label').removeClass('active');
				},

				this.hideText = function() {
					console.log('hide text');
					$(this).closest('.constructor-layout__label').addClass('constructor-hidden');
				}

				this.inputFocus = function() {
					console.log('focus');
					var $th = $(this),
							$display = $th.closest('.constructor-layout')
									.find('.constructor-layout__display'),
							$sample = $th.closest('.constructor-layout');

					$th.closest('.constructor-layout__label').addClass('active');

					$display.removeClass('active');

					_self.sampleActivation($sample);
				},

				this.imageClick = function(e) {
					
					var $th = $(this),
						$sample = $th.closest('.constructor-layout');

						$th.closest('.constructor-layout__display').addClass('active');
						
						$th.closest('.constructor-layout__display')
							.find('.constructor-layout__label')
							.removeClass('active');

						$sample.find('.constructor-edit')
							.addClass('active');
						
						$sample.siblings()
							.find('.constructor-edit')
							.removeClass('active');

					_self.sampleActivation($sample);
				},

				this.sampleActivation = function(sample) {
					sample
						.addClass('active')
						.siblings()
						.removeClass('active');

					sample
						.siblings()
						.find('.constructor-layout__display')
						.removeClass('active');

					sample
						.siblings()
						.find('.constructor-layout__label')
						.removeClass('active');

					$('#toggle-side').addClass('active');
				}
			}

			var layoutClass = new Layout();
		 	layoutClass.init();

		 	// end layout edit


		 	// label text animation
		 	// if($('.constructor-volume__adding .constructor-custom-label__text').length > 0){
		 	// 	function SplitLetters(selector, wrapper = "$", delimeter = "", joiner = "") {
		 	// 		console.log('split');

		 	// 		let nodeList = document.querySelectorAll(selector);

		 	// 		function parseLetters(node) {
		 	// 			let htmlNode = node.cloneNode();
		 	// 			htmlNode.innerHTML = "";

		 	// 			for (let i = 0; i < node.childNodes.length; i++) {
		 	// 				let childNode = node.childNodes[i];
		 	// 				if (childNode.nodeType === Node.TEXT_NODE) {
		 	// 					htmlNode.innerHTML += childNode.data 
		 	// 					.split(delimeter)
		 	// 					.map(function(letter) {
		 	// 						if (letter === " ") {
		 	// 							return letter;
		 	// 						}
		 	// 						else {
		 	// 							return wrapper.replace(/\$/g, letter);
		 	// 						}
		 	// 					})
		 	// 					.join(joiner);
		 	// 				}
		 	// 				else {
		 	// 					htmlNode.appendChild(parseLetters(childNode));
		 	// 				}
		 	// 			}

		 	// 			return htmlNode;
		 	// 		}

		 	// 		for (let i = 0; i < nodeList.length; i++) {
		 	// 			nodeList[i].innerHTML = parseLetters(nodeList[i]).innerHTML;
		 	// 		}
		 	// 	}

		  //   	SplitLetters(".constructor-volume__adding .constructor-custom-label__text", "<span class=\"letter\">$</span>", "", "");
				
				// var tl = new TimelineMax({repeat:-1,yoyo:true});

				// tl.staggerFromTo('.constructor-volume__adding .constructor-custom-label__text .letter', .5, {x:20, opacity: 0}, {x: 0, opacity: 1, yoyo: true}, 0.08);
		 	// }
	 		

				// end label text animation
	});
});