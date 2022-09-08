var vpshosting = (function() {

    var vpshosting = function(options) {
        //console.log(options);
    };
    vpshosting.prototype = {
        loadToggleAction		: function(_selector) {
            var yearly_prices = this.getYearlyPrices();
            var monthly_prices = this.getMonthlyPrices();

            $('.togglebtn.yearlyPrice').on('click', function() {
                if($('button.togglebtn.yearlyPrice').hasClass('btn-active')) {
                    $('button.togglebtn.yearlyPrice').removeClass('btn-active');
                    $('button.togglebtn.yearlyPrice').find('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');

                    $('.price.vpsyearly').hide();
                    $('.price.vpsmontly').show();

                    $('a.vps1').attr('href', monthly_prices.vps1);
                    $('a.vps2').attr('href', monthly_prices.vps2);
                    $('a.vps3').attr('href', monthly_prices.vps3);
                    $('a.vps4').attr('href', monthly_prices.vps4);
                    $('a.vps5').attr('href', monthly_prices.vps5);
                    $('a.vps6').attr('href', monthly_prices.vps6);
                } else {
                    $('button.togglebtn.yearlyPrice').addClass('btn-active');
                    $('button.togglebtn.yearlyPrice').find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');

                    $('.price.vpsyearly').show();
                    $('.price.vpsmontly').hide();
                    
                    $('a.vps1').attr('href', yearly_prices.vps1);
                    $('a.vps2').attr('href', yearly_prices.vps2);
                    $('a.vps3').attr('href', yearly_prices.vps3);
                    $('a.vps4').attr('href', yearly_prices.vps4);
                    $('a.vps5').attr('href', yearly_prices.vps5);
                    $('a.vps6').attr('href', yearly_prices.vps6);
                }
            });
        },
        showDiscountPrices  : function (_selector) {
            var monthly = $('.vpsmontly');
            monthly.each(function(index, value) {
                var m_value = $(value).text().replace('$', '').replace('/month','');
                var y_value = $(value).next('.vpsyearly').text().replace('$', '').replace('/year','');
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
                'vps1'          : '/portal/cart.php?a=add&pid=67&billingcycle=annually',
                'vps2'        : '/portal/cart.php?a=add&pid=68&billingcycle=annually',
                'vps3'       : '/portal/cart.php?a=add&pid=70&billingcycle=annually',
                'vps4'          : '/portal/cart.php?a=add&pid=82&billingcycle=annually',
                'vps5'        : '/portal/cart.php?a=add&pid=71&billingcycle=annually',
                'vps6'       : '/portal/cart.php?a=add&pid=81&billingcycle=annually'
            }
            return yearly_prices;
        },
        getMonthlyPrices    : function(_selector) {
            var monthly_prices = {
                'vps1'          : '/portal/cart.php?a=add&pid=67',
                'vps2'        : '/portal/cart.php?a=add&pid=68',
                'vps3'       : '/portal/cart.php?a=add&pid=70',
                'vps4'          : '/portal/cart.php?a=add&pid=82',
                'vps5'        : '/portal/cart.php?a=add&pid=71',
                'vps6'       : '/portal/cart.php?a=add&pid=81'
            }
            return monthly_prices;
        }
    };
    return vpshosting;
})();

$(document).ready(function(){
    var vpshostingObj = new vpshosting;
    vpshostingObj.loadToggleAction();
    vpshostingObj.showDiscountPrices();

    $('.tooltip-wrapper, .tooltipOnRequest, .discount').tooltip({placement: "top"});
    $('.tooltipBurstableRam').tooltip({placement: "right"});


});
