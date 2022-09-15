jQuery(function (jQuery) {

	 "use strict";



jQuery(window).on('load', function(e) {

	jQuery('.pt-masonry').isotope({

          itemSelector: '.pt-masonry-item',      

            masonry: {

              columnWidth: '.grid-sizer',

              gutter: 0

            }

           

      });



      jQuery('.pt-grid').isotope({

          itemSelector: '.pt-grid-item',

             

      });



       jQuery('.pt-filter-button-group').on( 'click', '.pt-filter-btn', function() {

        

        var filterValue = jQuery(this).attr('data-filter');

        jQuery('.pt-masonry').isotope({ filter: filterValue });

        jQuery('.pt-grid').isotope({ filter: filterValue });

        jQuery('.pt-filter-button-group .pt-filter-btn').removeClass('active');

        jQuery(this).addClass('active');

        

        

        updateFilterCounts();



      });



       var initial_items = 5;

       var next_items = 3;

	

	if(jQuery('.pt-masonry').length > 0)

		{

			var initial_items = jQuery('.pt-masonry').data('initial_items');

			var next_items = jQuery('.pt-masonry').data('next_items');

		}



		if(jQuery('.pt-grid').length > 0)

		{

			var initial_items = jQuery('.pt-grid').data('initial_items');

			var next_items = jQuery('.pt-grid').data('next_items');

		}



	function showNextItems(pagination) {

		var itemsMax = jQuery('.visible_item').length;

		var itemsCount = 0;

		jQuery('.visible_item').each(function () {

			if (itemsCount < pagination) {

				jQuery(this).removeClass('visible_item');

				itemsCount++;

			}

		});

		if (itemsCount >= itemsMax) {

			jQuery('#showMore').hide();

		}

		

		if(jQuery('.pt-masonry').length > 0)

		{

			jQuery('.pt-masonry').isotope('layout');

		}



		if(jQuery('.pt-grid').length > 0)

		{

			jQuery('.pt-grid').isotope('layout');

		}



		

		

	}

	// function that hides items when page is loaded

	function hideItems(pagination) {

		var itemsMax = jQuery('.pt-filter-items').length;

		

		var itemsCount = 0;

		jQuery('.pt-filter-items').each(function () {

			if (itemsCount >= pagination) {

				jQuery(this).addClass('visible_item');

			}

			itemsCount++;

		});

		if (itemsCount < itemsMax || initial_items >= itemsMax) {

			jQuery('#showMore').hide();

		}

		if(jQuery('.pt-masonry').length > 0)

		{

			jQuery('.pt-masonry').isotope('layout');

		}



		if(jQuery('.pt-grid').length > 0)

		{

			jQuery('.pt-grid').isotope('layout');

		}

	}

	jQuery('#showMore').on('click', function (e) {

		e.preventDefault();

		showNextItems(next_items);

	});

	hideItems(initial_items);



	function updateFilterCounts() {

		// get filtered item elements

		if(jQuery('.pt-masonry').length > 0)

		{

			var itemElems = jQuery('.pt-masonry').isotope('getFilteredItemElements');

		}

		if(jQuery('.pt-grid').length > 0)

		{

			var itemElems = jQuery('.pt-grid').isotope('getFilteredItemElements');

		}

		



		var count_items = jQuery(itemElems).length;

		



		if (count_items > initial_items) {

			jQuery('#showMore').show();

		} else {

			jQuery('#showMore').hide();

		}

		if (jQuery('.pt-filter-items').hasClass('visible_item')) {

			jQuery('.pt-filter-items').removeClass('visible_item');

		}

		var index = 0;



		jQuery(itemElems).each(function () {

			if (index >= initial_items) {

				jQuery(this).addClass('visible_item');

			}

			index++;

		});

		if(jQuery('.pt-masonry').length > 0)

		{

			jQuery('.pt-masonry').isotope('layout');

		}



		if(jQuery('.pt-grid').length > 0)

		{

			jQuery('.pt-grid').isotope('layout');

		}

	}

	});

});