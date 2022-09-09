var general = (function() {

	var general = function(options) {
		//console.log(options);
	};
	general.prototype = {

		loadBackToTop     : function(_selector) {
			if ($('#back-to-top').length) {
				var scrollTrigger = 100, // px
					backToTop = function () {
						var scrollTop = $(window).scrollTop();
						if (scrollTop > scrollTrigger) {
							$('#back-to-top').addClass('show');
						} else {
							$('#back-to-top').removeClass('show');
						}
					};
				backToTop();
				$(window).on('scroll', function () {
					backToTop();
				});
				$('#back-to-top').on('click', function (e) {
					e.preventDefault();
					$('html,body').animate({
						scrollTop: 0
					}, 700);
				});
			}
		},
		loadTopbarAnimation    : function(_selector) {
			/* topbar hide & show */
			navbarHeight = $(".topbar").outerHeight();
			$(window).on('scroll', function () {
				var a = $(this).scrollTop();
				if(navbarHeight < a) {
					$(".topbar").slideUp();
					$('.navigation').addClass('topBorder');
				} else {
					$(".topbar").slideDown();
					$('.navigation').removeClass('topBorder');
				}
			});
		}
	};
	return general;
})();

$(document).ready(function(){
	var generalObj = new general;
	generalObj.loadBackToTop();
	generalObj.loadTopbarAnimation();

	/* prevent dropdown close */
	$('.loginContainerDropdown').on('click',function(e) {
		e.stopPropagation();
	});

	$("[data-toggle=popover]").popover();
	$('.navbar .tooltip-wrapper').tooltip({placement: "bottom"});

	$('.compareLink').on('click', function() {
		$('.comparePlans').slideToggle()
	});

});
