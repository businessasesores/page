var businessHosting = (function() {

    var businessHosting = function(options) {
        //console.log(options);
    };
    businessHosting.prototype = {
        loadToggleAction		: function(_selector) {
            var yearly_prices = this.getYearlyPrices();
            var monthly_prices = this.getMonthlyPrices();

            $('.togglebtn.yearlyPrice').on('click', function() {
                if($('button.togglebtn.yearlyPrice').hasClass('btn-active')) {
                    $('button.togglebtn.yearlyPrice').removeClass('btn-active');
                    $('button.togglebtn.yearlyPrice').find('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
                    if($('.togglebtn.freeDomain').hasClass('btn-active')) {
                        $('.YearlyWithFreeDomains').hide();
                        $('.withFreeDomains').show();

                        $('.business_standard').attr('href', monthly_prices.business_standard);
                        $('.business_ultimate').attr('href', monthly_prices.business_ultimate);
                    } else {
                        $('.withFreeDomains').hide();
                        $('.YearlyWithFreeDomains').hide();

                        $('.business_standard').attr('href', monthly_prices.business_standard);
                        $('.business_ultimate').attr('href', monthly_prices.business_ultimate);
                    }
                } else {
                    $('button.togglebtn.yearlyPrice').addClass('btn-active');
                    $('button.togglebtn.yearlyPrice').find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                    if($('.togglebtn.freeDomain').hasClass('btn-active')) {
                        $('.withFreeDomains').hide();
                        $('.YearlyWithFreeDomains').show();

                        $('.business_standard').attr('href', yearly_prices.business_standard);
                        $('.business_ultimate').attr('href', yearly_prices.business_ultimate);
                    } else {
                        $('.YearlyWithFreeDomains').hide();
                        $('.withFreeDomains').hide();

                        $('.business_standard').attr('href', yearly_prices.business_standard);
                        $('.business_ultimate').attr('href', yearly_prices.business_ultimate);
                    }
                }
            });
        },
        showDiscountPercent  : function (_selector) {
            var monthly = $('.withFreeDomains');
            monthly.each(function(index, value) {
                var m_value = $(value).text().replace('$', '').replace('/month','');
                var y_value = $(value).next('.YearlyWithFreeDomains').text().replace('$', '').replace('/year','');
                var months12 = m_value * 12;

                if ( months12 > y_value ) {
                    var diff = months12 - y_value;
                    diff = diff.toString(); //If it's not already a String
                    diff = diff.slice(0, (diff.indexOf("."))+3);
                    $(value).siblings('.discount').text('You save $' + diff + ' yearly!');
                    $(value).siblings('.discount').css('display', 'inline-block');;
                }
            });
        },
        getYearlyPrices     : function(_selector) {
            var yearly_prices = {
                'business_standard'         : '/portal/cart.php?a=add&pid=16&billingcycle=annually',
                'business_ultimate'         : '/portal/cart.php?a=add&pid=17&billingcycle=annually'
            }
            return yearly_prices;
        },
        getMonthlyPrices    : function(_selector) {
            var monthly_prices = {
                'business_standard'         : '/portal/cart.php?a=add&pid=16&billingcycle=monthly',
                'business_ultimate'         : '/portal/cart.php?a=add&pid=17&billingcycle=monthly'
            }
            return monthly_prices;
        }
    };
    return businessHosting;
})();

$(document).ready(function(){
    var businessHostingObj = new businessHosting;
    businessHostingObj.loadToggleAction();
    businessHostingObj.showDiscountPercent();

    $('.tooltip-wrapper, .discount').tooltip({placement: "top"});
});