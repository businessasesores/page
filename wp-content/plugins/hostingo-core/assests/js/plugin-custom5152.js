(function(jQuery) {
    "use strict";
    jQuery(document).ready(function() {
        
       var app_slider = jQuery('#qsSlider');
    // console.log(app_slider.data('cpanel'));
    // jQuery('#qsSlider').qsSlider({
      app_slider.qsSlider({
        PriceBase : app_slider.data('PriceBase'),   
        PriceCPU :  app_slider.data('PriceCPU'),  
        PriceRAM :  app_slider.data('PriceRAM'),  
        PriceHDD :  app_slider.data('PriceHDD'),    
        MaxCPU  : app_slider.data('number'),    
        MaxRAM  : app_slider.data('ram'), 
        MaxHDD  : app_slider.data('hdd'),  
        cPanelPrice : app_slider.data('cpanel'),
        discount  : app_slider.data('dis_price'),    
        // defaultPreset : 's', 
      });
       
    });
    jQuery(window).on('load', function(e) {


      // vps slider

         // jQuery('#qsSlider').each(function() {    
   
     // });

    
            
      //jQuery('path[class="shp0"]').attr('id' , 'test');            
        /*----------------
           Counter
           ---------------------*/
           jQuery('.timer').countTo();
           // var s = skrollr.init();
          // jQuery('#dc-submit-1').on('click' , function(){
          //   console.log('ok');
          // });
           
            jQuery('p:empty').remove();
            jQuery('.pt-section-title').each(function(){
                var text = jQuery(this).text().split(' ');
                if(text.length < 2)
                    return;
             
                text[2] = '<span class="imp-word">'+text[2]+'</span>';
                
                jQuery(this).html(
                    text.join(' ')
                );
    
            });
            /*----------------
           image grid 
           ---------------------*/
           // external js: isotope.pkgd.js
            // jQuery(".grid").isotope({
            //   itemSelector: ".grid-item",
            //   percentPosition: true,
            //   masonry: {
            //     columnWidth: ".grid-sizer"
            //   }
            // });
       /*----------------
           Tox Progress Bar
           ---------------------*/    
        jQuery('.pt-circle-progress-bar').each(function() {
      var number = jQuery(this).data('skill-level');
      var empty_color = jQuery(this).data('empty-color');
      var fill_color = jQuery(this).data('fill-color');
      var size = jQuery(this).data('size');
      var thickness = jQuery(this).data('thickness');
      
       jQuery(this).circleProgress({
      value: '0.' + number,
      size: size,
      emptyFill: empty_color,
      fill: {
        color: fill_color
      }
    }).on('circle-animation-progress', function(event, progress) {
      jQuery(this).find('.pt-progress-count').html(Math.round(number * progress) + '%');
    });
       });  
        jQuery('.pt-progress-bar > span').each(function() {
                    
                    var progress_bar = jQuery(this);
                    var width = jQuery(this).data('percent');
                    progress_bar.css({
                        'transition': 'width 2s'
                    });
                    jQuery('.progress-value').css({'transition': 'margin 2s'});
                    setTimeout(function() {
                        jQuery(this).show(function() {
                            progress_bar.css('width', width + '%');
                        });
                    }, 500);
                    setTimeout(function() {
                        jQuery('.pt-progressbar-style-2 .progress-value').show(function() {
                            jQuery('.pt-progressbar-style-2 .progress-value').css('margin-left', width + 'px');
                        });
                    }, 500);
                    setTimeout(function() {
                        jQuery('.pt-progressbar-style-3 .progress-tooltip').show(function() {
                            jQuery('.pt-progressbar-style-3 .progress-tooltip').css('margin-left', width + 'px');
                        });
                    }, 500);
                });
          
         /*------------------------
        Accordion
       --------------------------*/
          
        jQuery('.pt-accordion-block .pt-accordion-box .pt-accordion-details').hide();
                jQuery('.pt-accordion-block .pt-accordion-box:first').addClass('pt-active').children().slideDown('slow');
                jQuery('.pt-accordion-block .pt-accordion-box').on("click", function() {
                    if (jQuery(this).children('div.pt-accordion-details').is(':hidden')) {
                        jQuery('.pt-accordion-block .pt-accordion-box').removeClass('pt-active').children('div.pt-accordion-details').slideUp('slow');
                        jQuery(this).toggleClass('pt-active').children('div.pt-accordion-details').slideDown('slow');
                    }
                });
       
       /*------------------------
       Owl Carousel
       --------------------------*/

       jQuery('.owl-carousel').each(function() {
      var app_slider = jQuery(this);
      var rtl = false;
      var prev = 'ion-ios-arrow-back';
      var next = 'ion-ios-arrow-forward';
      var prev_text = '';
      var next_text = '';
      if(jQuery('body').hasClass('pt-is-rtl'))
      {
          rtl = true;
             prev = 'ion-ios-arrow-forward';
            next = 'ion-ios-arrow-back';
      }
      if(app_slider.data('prev_text') && app_slider.data('prev_text') != '')
      {
        prev_text = app_slider.data('prev_text');
      }
      if(app_slider.data('next_text') && app_slider.data('next_text') != '')
      {
        next_text = app_slider.data('next_text');
      }
      app_slider.owlCarousel({
        rtl:rtl,
        items: app_slider.data("desk_num"),
        loop: app_slider.data("loop"),
        margin: app_slider.data("margin"),
        nav: app_slider.data("nav"),
        dots: app_slider.data("dots"),
        loop: app_slider.data("loop"),
        autoplay: app_slider.data("autoplay"),
        autoplayTimeout: app_slider.data("autoplay-timeout"),
        navText: ["<i class='"+prev+"'></i><span>"+prev_text+"</span>", "<span>"+next_text+"</span><i class='"+next+"'></i>"],
        responsiveClass: true,
        responsive: {
          // breakpoint from 0 up
          0: {
            items: app_slider.data("mob_sm"),
            nav: false,
            dots: true
          },
          // breakpoint from 480 up
          480: {
            items: app_slider.data("mob_num"),
            nav: false,
            dots: true
          },
          // breakpoint from 786 up
          786: {
            items: app_slider.data("tab_num")
          },
          // breakpoint from 1023 up
          1023: {
            items: app_slider.data("lap_num")
          },
          1199: {
            items: app_slider.data("desk_num")
          }
        }
      });
    });

 
       
    jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps, .button-play').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        preloader: true,
    });
    setTimeout(init, 1000);
        function init() {       
       jQuery('.content__image-wrap').each(function() {
        var watcher_id = jQuery(this).attr('id');
        var color = jQuery(this).data("color")
        var direction = jQuery(this).data("direction")
        var scrollElemToWatch_1 = document.getElementById(watcher_id);
        var watcher_1 = scrollMonitor.create(scrollElemToWatch_1, -300);
        var rev3 = new RevealFx(scrollElemToWatch_1, {
            revealSettings : {
              bgcolor: color,
              direction: direction,
              onCover: function(contentEl, revealerEl) {
                contentEl.style.opacity = 1;
              }
            }
          });
        watcher_1.enterViewport(function() {
          rev3.reveal();          
          watcher_1.destroy();
        });
        });
      }
// swiper
var sliders = [];
var slider;
      jQuery('.swiper-container').each(function(index, element){
  
         var ele = jQuery(this);
          
        ele.addClass('s'+index);
      
          slider = new Swiper('.s'+index, { 
          slidesPerView: ele.data('desk_num'),
          spaceBetween : ele.data('margin'),
          loop:ele.data('loop'),
          autoplay : ele.data('autoplay'),
          navigation: {
                 nextEl: '.swiper-button-next',
                 prevEl: '.swiper-button-prev',
           },
            pagination: {
                el: '.swiper-pagination',
                type : ele.data('pagination_type'),
                renderFraction: function (currentClass, totalClass) {
               return '<span class="' + currentClass + '"></span>' +
                  ' <span class="pt-page-seprate">/</span> ' +
                  '<span class="' + totalClass + '"></span>';
             },
                
          },
          
          breakpoints: {
            // when window width is >= 320px
             0: {
              slidesPerView: ele.data('mob_sm'),
              
            },
            480: {
              slidesPerView: ele.data('mob_num'),
              
            },
            // when window width is >= 480px
            767: {
              slidesPerView: ele.data('tab_num'),
              
            },
            // when window width is >= 640px
            1023: {
              slidesPerView: ele.data('lap_num'),
              
            },
            1199: {
              slidesPerView: ele.data('desk_num'),
              
              }
          }
        });
        sliders.push(slider);
      });
      
   });
})(jQuery);
