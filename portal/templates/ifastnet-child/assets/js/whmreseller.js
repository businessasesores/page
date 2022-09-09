var whmreseller = (function() {

    var whmreseller = function(options) {
        //console.log(options);
    };
    whmreseller.prototype = {
        loadToggleAction		: function(_selector) {
            var yearly_prices = this.getYearlyPrices();
            var monthly_prices = this.getMonthlyPrices();

            $('.togglebtn.yearlyPrice').on('click', function() {
                if($('button.togglebtn.yearlyPrice').hasClass('btn-active')) {
                    $('button.togglebtn.yearlyPrice').removeClass('btn-active');
                    $('button.togglebtn.yearlyPrice').find('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');

                    $('.price.whmyearly').hide();
                    $('.price.whmmonthly').show();

                    $('a.reseller1').attr('href', monthly_prices.reseller1);
                    $('a.reseller2').attr('href', monthly_prices.reseller1);
                    $('a.reseller3').attr('href', monthly_prices.reseller1);
                } else {
                    $('button.togglebtn.yearlyPrice').addClass('btn-active');
                    $('button.togglebtn.yearlyPrice').find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');

                    $('.price.whmyearly').show();
                    $('.price.whmmonthly').hide();

                    $('a.reseller1').attr('href', yearly_prices.reseller1);
                    $('a.reseller2').attr('href', yearly_prices.reseller1);
                    $('a.reseller3').attr('href', yearly_prices.reseller1);
                }
            });
        },
        showDiscountPrices  : function (_selector) {
            var monthly = $('.whmmonthly');
            monthly.each(function(index, value) {
                var m_value = $(value).text().replace('$', '').replace('/month','');
                var y_value = $(value).next('.whmyearly').text().replace('$', '').replace('/year','');
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
                'reseller1'          : '/portal/cart.php?a=add&pid=54&billingcycle=annually',
                'reseller2'        : '/portal/cart.php?a=add&pid=56&billingcycle=annually',
                'reseller3'       : '/portal/cart.php?a=add&pid=58&billingcycle=annually'
            }
            return yearly_prices;
        },
        getMonthlyPrices    : function(_selector) {
            var monthly_prices = {
                'reseller1'          : '/portal/cart.php?a=add&pid=54',
                'reseller2'        : '/portal/cart.php?a=add&pid=56',
                'reseller3'       : '/portal/cart.php?a=add&pid=58'
            }
            return monthly_prices;
        }
    };
    return whmreseller;
})();

$(document).ready(function(){
    var whmresellerObj = new whmreseller;
    whmresellerObj.loadToggleAction();
    whmresellerObj.showDiscountPrices();

    $('.discount, .tooltip-wrapper').tooltip({placement: "top"});
});