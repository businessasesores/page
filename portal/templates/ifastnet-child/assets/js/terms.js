var terms = (function() {

    var terms = function(options) {
        //console.log(options);
    };
    terms.prototype = {

        searchTermsAction     : function(_selector) {
            var count = 0;
            $('#searchTerms').on('input',function() {
                var termsDivArray = $('.termsDiv h4, .termsDiv h3,.termsDiv h2, .termsDiv h1, .termsDiv p, .termsDiv li').removeClass('highlighted').get();
                var searchTerm = $('#searchTerms').val();
                if(searchTerm) {
                    $.each(termsDivArray, function(index, value) {
                        var matches = $(value).text().toLowerCase().match(searchTerm.toLowerCase());
                        if(matches) {
                            $(value).addClass('highlighted');
                        }
                    });
                    if($('.termsDiv .highlighted:first').length != 0) {
                        $('.termsDiv').scrollTop(0).scrollTop($('.termsDiv .highlighted:first').offset().top - $('.termsDiv').offset().top - 40);
                    }
                    count = $('.termsDiv .highlighted').length;
                    if(count > 1) {
                        $('.nextButton').prop("disabled", false);
                    } else {
                        $('.nextButton').prop("disabled", true);
                    }
                } else {
                    $('.nextButton').prop("disabled", true);
                }
            });

            $('.nextButton').on('click', function() {
                var current = $('.nextButton').data('no');
                if(current <= count-1) {
                    $('.termsDiv').scrollTop(0).scrollTop($('.termsDiv .highlighted:eq('+ current +')').offset().top - $('.termsDiv').offset().top - 40);
                }

                if(current >= count-1) {
                    $('.nextButton').data('no', 0)
                } else {
                    $('.nextButton').data('no', current+1);
                }
            });
        }
    };
    return terms;
})();

$(document).ready(function(){
    var termsObj = new terms;
    termsObj.searchTermsAction();
});